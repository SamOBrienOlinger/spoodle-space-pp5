const { chromium, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://127.0.0.1:4173/spoodle-space-pp5';
const outputDir = 'verification-artifacts/responsive';
fs.mkdirSync(outputDir, { recursive: true });
const results = [];
const failures = [];
const avatar = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" rx="50" fill="#d9c4ed"/><circle cx="50" cy="36" r="18" fill="#7040b7"/><path d="M16 95a34 34 0 0 1 68 0" fill="#7040b7"/></svg>');
const reportedName = 'Christopher_Dog_Walken';
const longName = (reportedName + '_').repeat(8).slice(0, 150);
const internationalName = 'Sam & Benji 🐾 / 爱狗的人 — مُحِب الكلاب #42';
const routes = [
  ['profile', '/profiles/1'],
  ['feed', '/'],
  ['post-comments', '/posts/7'],
  ['dog-profile', '/dogprofiles/7'],
  ['dog-health', '/doghealth/7/'],
  ['dog-danger', '/dogdanger/7'],
  ['edit-profile', '/profiles/1/edit'],
  ['username-form', '/profiles/1/edit/username'],
  ['create-post', '/posts/create'],
  ['signup', '/signup'],
];

async function runScenario(browser, scenario) {
  const page = await browser.newPage({ viewport: scenario.viewport, reducedMotion: 'reduce' });
  page.setDefaultTimeout(10000);
  const username = scenario.username || longName;
  let signedIn = true;
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  const profile = { id: 1, owner: username, name: username, is_owner: true, image: avatar, content: 'A dog person. ' + 'LongBioWithoutBreaks'.repeat(12), posts_count: 12345, followers_count: 1234567, following_count: 12345, dog_profile: null, dog_health: null, dog_danger: null };
  const user = { pk: 1, username, profile_id: 1, profile_image: avatar };
  const post = { id: 7, owner: username, profile_id: 1, profile_image: avatar, title: 'A walk with friends', content: 'LongPostWithoutBreaks'.repeat(12), image: avatar, updated_at: '12 Sep 2026', comments_count: 1, likes_count: 12345 };
  const dog = { id: 7, owner: username, owner_id: 1, profile_id: 1, profile_image: avatar, is_owner: true, updated_at: '12 Sep 2026', dog_profile_image: avatar, dog_name: 'LongDogName'.repeat(12), dog_age: '3', dog_color: 'Golden', dog_bio: 'A very good dog', vet_name: 'The local vet', vet_phone: '+353 1 234 5678', vet_email: 'averylongemailaddress'.repeat(5) + '@example.com', allergies: 'None', dangerously_cute: 'Yes' };
  const list = items => ({ count: items.length, next: null, previous: null, results: items });
  await page.route('**/api/**', async route => {
    const url = new URL(route.request().url());
    const pathname = url.pathname.replace(/^\/api/, '').replace(/\/$/, '');
    let body = list([]);
    let status = 200;
    if (pathname === '/dj-rest-auth/user') {
      status = signedIn ? 200 : 401;
      body = signedIn ? user : { detail: 'No active test session' };
    } else if (pathname === '/dj-rest-auth/token/refresh') {
      status = signedIn ? 200 : 401;
      body = signedIn ? {} : { detail: 'No active test session' };
    }
    else if (pathname === '/profiles/1') body = profile;
    else if (pathname === '/profiles') body = list([
      profile,
      { ...profile, id: 2, is_owner: false, owner: internationalName, following_id: 20 },
      { ...profile, id: 3, is_owner: false, owner: longName.slice(0, 149) + '!', following_id: null },
    ]);
    else if (pathname === '/posts/7') body = post;
    else if (pathname === '/posts') body = list([post]);
    else if (pathname === '/comments') body = list([{ id: 8, owner: username, profile_id: 1, profile_image: avatar, updated_at: '12 Sep 2026', content: 'LongCommentWithoutBreaks'.repeat(12) }]);
    else if (/^\/(dogprofiles|doghealth|dogdanger)\/7$/.test(pathname)) body = dog;
    else if (/^\/(dogprofiles|doghealth|dogdanger)$/.test(pathname)) body = list([]);
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });

  async function visit(name, url) {
    signedIn = name !== 'signup';
    if (name === 'edit-profile' || name === 'username-form') {
      await page.goto(baseUrl + '/profiles/1');
      await page.getByRole('heading', { name: username, exact: true }).waitFor();
      await page.locator('#spoodlespace-navigation a[href$="/profiles/1"]').waitFor({ state: 'attached' });
      await page.getByRole('button', { name: 'More options' }).first().click();
      await page.getByLabel(name === 'edit-profile' ? 'edit-profile' : 'edit-username', { exact: true }).click();
    } else if (name === 'create-post') {
      await page.goto(baseUrl + '/');
      await page.getByRole('link', { name: 'Create post', exact: true }).click();
    } else {
      await page.goto(baseUrl + url);
    }
    const ready = {
      profile: () => page.getByRole('heading', { name: username, exact: true }).waitFor(),
      feed: () => page.getByLabel('Sort posts').waitFor(),
      'post-comments': () => page.getByLabel('Add a comment', { exact: true }).waitFor(),
      'dog-profile': () => page.getByText('Dog Name', { exact: true }).waitFor(),
      'dog-health': () => page.getByText('Vet Name', { exact: true }).waitFor(),
      'dog-danger': () => page.getByText('Dangeroulsy Cute?', { exact: true }).waitFor(),
      'edit-profile': () => page.getByRole('heading', { name: 'Edit my profile', exact: true }).waitFor(),
      'username-form': () => page.getByRole('heading', { name: 'Change username', exact: true }).waitFor(),
      'create-post': () => page.locator('form').filter({ has: page.locator('input[type="file"]') }).waitFor(),
      signup: () => page.getByRole('heading', { name: 'Join SpoodleSpace', exact: true }).waitFor(),
    };
    await ready[name]();
    if (signedIn) await page.locator('#spoodlespace-navigation a[href$="/profiles/1"]').waitFor({ state: 'attached' });
    await page.evaluate(() => document.fonts.ready);
    if (scenario.largeText) await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }

  async function measure(name) {
    const metrics = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      const issues = [];
      for (const element of document.body.querySelectorAll('*')) {
        if (!(element instanceof HTMLElement)) continue;
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (!rect.width || !rect.height || style.visibility === 'hidden') continue;
        if (element.closest('.sr-only, [aria-hidden="true"]')) continue;
        // This strip deliberately scrolls horizontally to show more people.
        if (element.closest('[class*="MobileProfiles"]')) continue;
        // A compact account label is allowed to ellipsize if its full name is exposed.
        if (style.textOverflow === 'ellipsis' && element.closest('[title]')) continue;
        const outside = rect.left < -2 || rect.right > width + 2;
        const internallyWide = !/^(INPUT|TEXTAREA|SELECT|IMG)$/.test(element.tagName)
          && element.scrollWidth > element.clientWidth + 2;
        if (outside || internallyWide) issues.push({
          tag: element.tagName,
          className: element.className,
          text: (element.innerText || '').slice(0, 85),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
          outside,
        });
      }
      const navbar = document.querySelector('nav.navbar');
      const main = document.querySelector('[class*="App_Main"]');
      return {
        viewportWidth: width,
        documentWidth: document.documentElement.scrollWidth,
        navbarBottom: navbar?.getBoundingClientRect().bottom,
        contentTop: main ? parseFloat(getComputedStyle(main).paddingTop) : null,
        issues: issues.slice(0, 35),
      };
    });
    const errors = [];
    if (metrics.documentWidth > metrics.viewportWidth + 2) errors.push('document overflows');
    if (metrics.issues.length) errors.push('content does not fit');
    if (metrics.navbarBottom > metrics.contentTop + 2) errors.push('fixed navigation covers page content');
    if (pageErrors.length) errors.push(...pageErrors);
    results.push({ scenario: scenario.name, route: name, errors, ...metrics });
    if (errors.length) failures.push(scenario.name + '/' + name + ': ' + errors.join(', '));
  }

  for (const [name, url] of routes.filter(([name]) => !scenario.only || scenario.only.includes(name))) {
    try {
      await visit(name, url);
      await measure(name);
      if (name === 'profile' || (scenario.name === 'chromium-390' && ['post-comments', 'dog-health', 'edit-profile'].includes(name))) {
        await page.screenshot({ path: path.join(outputDir, scenario.name + '-' + name + '.png'), fullPage: true });
      }
      if (name === 'profile' && scenario.name === 'reported-390') {
        await page.evaluate(() => {
          const card = document.querySelector('[class*="ProfilePage_ProfileCard"]');
          if (card) window.scrollTo(0, card.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spoodle-nav-height')) - 12);
        });
        const screenshot = await page.screenshot({ type: 'jpeg', quality: 70 });
        console.log('RESPONSIVE_IMAGE ' + JSON.stringify({ name: 'profile-mobile', data: screenshot.toString('base64') }));
      }
      if (name === 'profile') {
        await page.getByRole('button', { name: 'More options' }).first().click();
        await page.getByLabel('edit-username', { exact: true }).waitFor();
        await measure('profile-menu');
        await page.getByRole('button', { name: 'More options' }).first().click();
      }
      if (name === 'feed' && scenario.viewport.width < 992) {
        await page.getByRole('button', { name: 'Toggle navigation' }).click();
        await page.getByRole('button', { name: 'Sign out', exact: true }).waitFor();
        // The expanded menu may overlay the content intentionally.
        const menu = await page.locator('#spoodlespace-navigation').boundingBox();
        if (!menu || menu.x < -2 || menu.x + menu.width > scenario.viewport.width + 2 || menu.y + menu.height > scenario.viewport.height + 2) failures.push(scenario.name + ': navigation menu overflows');
        await page.getByRole('button', { name: 'Toggle navigation' }).click();
      }
    } catch (error) {
      failures.push(scenario.name + '/' + name + ': ' + error.message);
      results.push({ scenario: scenario.name, route: name, errors: [error.message] });
    }
  }
  await page.close();
}

(async () => {
  const chrome = await chromium.launch();
  try {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await runScenario(chrome, { name: 'chromium-' + width, viewport: { width, height: 900 } });
    }
    await runScenario(chrome, { name: 'landscape-844', viewport: { width: 844, height: 390 }, only: ['profile', 'feed'] });
    await runScenario(chrome, { name: 'reported-390', viewport: { width: 390, height: 844 }, username: reportedName, only: ['profile'] });
    await runScenario(chrome, { name: 'large-text-390', viewport: { width: 390, height: 900 }, largeText: true, only: ['profile', 'feed', 'post-comments', 'dog-health', 'edit-profile', 'username-form', 'create-post', 'signup'] });
  } finally { await chrome.close(); }
  const safari = await webkit.launch();
  try {
    for (const width of [390, 1024]) await runScenario(safari, { name: 'webkit-' + width, viewport: { width, height: 900 } });
    await runScenario(safari, { name: 'unicode-390', viewport: { width: 390, height: 844 }, username: internationalName, only: ['profile', 'feed', 'post-comments'] });
  } finally { await safari.close(); }
  const report = { results, failures };
  fs.writeFileSync(path.join(outputDir, 'report.json'), JSON.stringify(report, null, 2));
  for (const result of results) console.log('RESPONSIVE_RESULT ' + JSON.stringify(result));
  console.log('RESPONSIVE_SUMMARY ' + JSON.stringify({ checks: results.length, failures }));
  if (failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
