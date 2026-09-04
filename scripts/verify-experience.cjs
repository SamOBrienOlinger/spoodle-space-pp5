const { chromium } = require('playwright-core');
const assert = require('assert').strict;
const fs = require('fs');
const base = 'http://127.0.0.1:4173/spoodle-space-pp5/';
const out = 'verification-artifacts';
const photo = 'https://res.cloudinary.com/dzhbg6go0/image/upload/v1670254218/CockapooClub/furry-fun_gsmi28.webp';
const profiles = [2,3,4].map((id,i)=>({id,owner:['aoife','liam','conor'][i],image:photo,following_id:null,followers_count:9,following_count:4,posts_count:2}));
const posts = [11,12].map((id,i)=>({id,owner:['aoife','liam'][i],profile_id:i+2,profile_image:photo,image:photo,title:['Sunday strolls','A little fresh air'][i],content:['A walk, a wag, and the very best company.','The good days start with muddy paws.'][i],updated_at:'2 hours ago',like_id:null,likes_count:12,comments_count:3}));
const report = {sourceCommit:process.env.SOURCE_SHA, scope:'Production React build; deterministic API fixtures, not live-account verification',viewports:[],checks:[],failures:[]};
const json=(route,body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
const pageOf=results=>({count:results.length,next:null,previous:null,results});
async function fixtures(page,state={}) {
  await page.route('**/api/**', async route=>{
    const req=route.request();const url=new URL(req.url());const path=url.pathname;
    if(path.endsWith('/user/'))return json(route,{pk:1,username:'sam',profile_id:1,profile_image:photo});
    if(path.includes('/token/refresh/'))return json(route,{});
    if(path.includes('/followers/'))return json(route,{id:501});
    if(path.includes('/profiles/'))return json(route,pageOf(profiles));
    if(path.includes('/likes/'))return json(route,state.failLike?{detail:'Try again'}:{id:700},state.failLike?503:200);
    if(path.includes('/posts/')){
      state.lastPosts=url.searchParams.toString();
      return json(route,state.failFeed?{detail:'Unavailable'}:pageOf(url.searchParams.get('search')==='nomatch'?[]:posts),state.failFeed?503:200);
    }
    return json(route,pageOf([]));
  });
}
async function ready(page){await page.goto(base,{waitUntil:'networkidle'});await page.locator('#post-title-11').waitFor();}
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH,headless:true,args:['--no-sandbox']});
  try{
    for(const width of [320,390,430,768,1024,1440]){
      const page=await browser.newPage({viewport:{width,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await fixtures(page);await ready(page);
      const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth-innerWidth,nav:getComputedStyle(document.querySelector('nav.navbar')).backgroundColor,gradient:getComputedStyle(document.querySelector('nav.navbar')).backgroundImage,logo:document.querySelector('img[alt="SpoodleSpace"]').naturalWidth,columns:[...document.querySelectorAll('aside')].filter(e=>e.getBoundingClientRect().width>0).length,unsupported:[...document.querySelectorAll('nav a')].some(e=>/calendar|events|marketplace|stories|messages|notifications/i.test(e.textContent))}));
      assert(metrics.overflow<=1,`Overflow at ${width}`);assert.equal(metrics.nav,'rgb(113, 17, 238)');assert.equal(metrics.gradient,'none');assert(metrics.logo>0);assert.equal(metrics.unsupported,false);assert.equal(metrics.columns,width>=992?2:0);
      await page.screenshot({path:`${out}/experience-${width}.png`,fullPage:true});
      if(width<992){await page.getByRole('button',{name:'Toggle navigation'}).click();await page.waitForTimeout(250);assert(await page.locator('#spoodlespace-navigation').isVisible());assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);if(width===390)await page.screenshot({path:`${out}/experience-mobile-menu.png`,fullPage:true});}
      assert.deepEqual(errors,[]);report.viewports.push({width,...metrics,unhandledErrors:errors});await page.close();
    }
    const page=await browser.newPage({viewport:{width:1440,height:1000}});const state={failLike:true};await fixtures(page,state);await ready(page);
    await page.getByRole('button',{name:'Like Sunday strolls',exact:true}).click();await page.getByRole('alert').filter({hasText:'Your like didn’t update'}).waitFor();assert.equal(await page.getByRole('button',{name:'Like Sunday strolls',exact:true}).getAttribute('aria-pressed'),'false');
    state.failLike=false;await page.getByRole('button',{name:'Like Sunday strolls',exact:true}).click();await page.getByRole('button',{name:'Unlike Sunday strolls',exact:true}).waitFor();assert.equal(await page.getByRole('button',{name:'Unlike Sunday strolls',exact:true}).getAttribute('aria-pressed'),'true');report.checks.push('Like error is visible; confirmed like changes state without optimistic false success');
    await page.getByRole('button',{name:'Follow aoife',exact:true}).click();await page.getByRole('button',{name:'Unfollow aoife',exact:true}).waitFor();report.checks.push('Follow action remains wired to existing follower API');
    await page.getByLabel('Sort posts').selectOption('-comments_count');await page.waitForTimeout(650);assert(new URLSearchParams(state.lastPosts).get('ordering')==='-comments_count');report.checks.push('Most-discussed sorting sends backend-supported ordering parameter');
    const search=page.locator('input[aria-label="Search posts by owner or title"]:visible').first();await search.fill('nomatch');await search.press('Enter');await page.getByRole('heading',{name:'No tails on this trail.'}).waitFor();await page.getByRole('button',{name:'Clear search'}).click();await page.locator('#post-title-11').waitFor();report.checks.push('Search, distinct empty state and clear-search recovery');
    state.failFeed=true;await page.reload({waitUntil:'networkidle'});await page.getByRole('alert').filter({hasText:'couldn’t load'}).waitFor();state.failFeed=false;await page.getByRole('button',{name:'Try again',exact:true}).click();await page.locator('#post-title-11').waitFor();report.checks.push('Feed failure is not shown as an empty community; retry restores posts');
    await page.close();
    const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await fixtures(reduced);await ready(reduced);assert.equal(await reduced.locator('.ss-enter').evaluate(e=>getComputedStyle(e).animationName),'none');report.checks.push('Reduced-motion preference disables entrance animations');await reduced.close();
    const demo=await browser.newPage({viewport:{width:1440,height:1000}});let apiCalls=0;await demo.route('https://samobrienolinger.github.io/**',async route=>{const u=new URL(route.request().url());if(u.pathname.startsWith('/api/')){apiCalls++;return route.fulfill({status:405,body:'Static host'});}const response=await demo.request.get('http://127.0.0.1:4173'+u.pathname+u.search);await route.fulfill({response});});
    await demo.goto('https://samobrienolinger.github.io/spoodle-space-pp5/',{waitUntil:'networkidle'});await demo.getByRole('heading',{name:'The little moments are the big ones.'}).waitFor();assert.equal(apiCalls,0);await demo.screenshot({path:`${out}/experience-pages-preview.png`,fullPage:true});report.checks.push('Clearly labelled design sample renders on Pages with zero API transmissions');await demo.close();report.result='passed';
  }catch(e){report.result='failed';report.failures.push(String(e.stack||e));process.exitCode=1;}
  finally{await browser.close();fs.writeFileSync(`${out}/experience-report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
})();
