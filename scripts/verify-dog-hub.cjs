/* Production-build journeys with synthetic data: no live account or backend writes. */
const { chromium } = require('playwright-core');
const assert = require('assert').strict;
const fs = require('fs');
const base = 'http://127.0.0.1:4173';
const out = 'verification-artifacts';
const photo = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="#d9c4ed"/><circle cx="400" cy="260" r="120" fill="#592482"/></svg>');
const user = { pk: 1, username: 'sam', profile_id: 50, profile_image: photo };
const profile = { id: 50, owner: 'sam', image: photo, content: 'Sam and Riley', dog_profile: 20, dog_health: 21, dog_danger: null, posts_count: 12, followers_count: 2, following_count: 3 };
const posts = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, owner: 'sam', profile_id: 50, profile_image: photo, title: `Walk ${i + 1}`, content: i ? 'A lovely walk.' : 'A long dog story. '.repeat(40), image: i % 2 ? photo : null, is_owner: true, updated_at: 'Today', comments_count: 0, likes_count: 0 }));
const pageOf = results => ({ count: results.length, results, next: null, previous: null });
const json = (route, body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
const report = { commit: process.env.SOURCE_SHA, scope: 'Built React app in Chrome; isolated API fixtures', viewports: [], checks: [] };
async function fixtures(page, state) {
  await page.route('**/api/**', async route => {
    const req = route.request(), url = new URL(req.url()), path = url.pathname.replace(/^\/api/, '');
    if (path === '/dj-rest-auth/user/') return json(route, state.guest ? { detail: 'Sign in' } : user, state.guest ? 401 : 200);
    if (path === '/dj-rest-auth/token/refresh/') return json(route, { detail: 'Sign in' }, 401);
    if (path === '/profiles/50/') return json(route, state.profileError ? { detail: 'Unavailable' } : { ...profile, dog_profile: state.deletedDog ? null : 20 }, state.profileError ? 503 : 200);
    if (path === '/profiles/') return json(route, pageOf([]));
    if (path === '/dogprofiles/20/') {
      if (req.method() === 'DELETE') {
        if (state.deleteError) return json(route, { detail: 'Please try again.' }, 503);
        state.deletedDog = true; return route.fulfill({ status: 204 });
      }
      return json(route, { id: 20, owner: 'sam', profile_id: 50, dog_name: 'Riley', dog_age: '3 years', dog_color: 'Gold', dog_bio: 'Loves a walk', dog_profile_image: photo });
    }
    if (path === '/doghealth/21/') return json(route, { id: 21, owner: 'sam', profile_id: 50, vet_name: 'Local vet' });
    if (path === '/posts/' && req.method() === 'POST') {
      state.upload = req.postDataBuffer();
      return json(route, state.expired ? { detail: 'Please sign in again.' } : posts[0], state.expired ? 401 : 201);
    }
    if (path === '/posts/') {
      state.query = url.searchParams.toString();
      return json(route, pageOf(url.searchParams.get('search') === 'nomatch' ? [] : posts));
    }
    if (/^\/posts\/\d+\/$/.test(path)) return json(route, posts.find(post => post.id === Number(path.split('/')[2])));
    if (path === '/comments/') return json(route, state.commentsError ? { detail: 'Unavailable' } : pageOf([]), state.commentsError ? 503 : 200);
    throw new Error(`Unexpected fixture request: ${req.method()} ${path}`);
  });
}
const goto = (page, path = '/') => page.goto(base + path, { waitUntil: 'networkidle' });
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  let current;
  try {
    for (const width of [320, 390, 768, 1440]) {
      current = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = []; current.on('pageerror', e => errors.push(e.message));
      await fixtures(current, {}); await goto(current);
      await current.getByRole('heading', { name: 'Walk 1', exact: true }).waitFor();
      const nav = current.getByRole('navigation', { name: 'Mobile navigation' });
      assert.equal(await nav.isVisible(), width < 992);
      if (width < 992) assert.deepEqual(await nav.getByRole('link').allTextContents(), ['Home', 'Search', 'Post', 'My dog', 'Profile']);
      assert.equal(await current.getByRole('button', { name: 'Toggle navigation' }).count(), 0);
      assert((await current.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 1, `Horizontal overflow at ${width}`);
      await current.screenshot({ path: `${out}/feed-${width}.png`, fullPage: false });
      await goto(current, '/my-dog');
      await current.getByRole('heading', { name: 'Riley', exact: true }).waitFor();
      assert((await current.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 1);
      await current.screenshot({ path: `${out}/dog-${width}.png`, fullPage: true });
      assert.deepEqual(errors, []); report.viewports.push(width); await current.close();
    }
    current = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const state = { commentsError: true, deleteError: true };
    await fixtures(current, state);
    await goto(current, '/search?q=walk&sort=-likes_count');
    await current.getByRole('heading', { name: 'Walk 1', exact: true }).waitFor();
    assert.equal(await current.getByLabel('Sort posts').inputValue(), '-likes_count');
    assert.equal(new URLSearchParams(state.query).get('search'), 'walk');
    await current.getByRole('link', { name: 'Walk 5', exact: true }).scrollIntoViewIfNeeded();
    const scroll = await current.evaluate(() => scrollY);
    await current.getByRole('link', { name: 'Walk 5', exact: true }).click();
    await current.getByRole('alert').filter({ hasText: 'couldn’t load comments' }).waitFor();
    await current.getByRole('heading', { name: 'Walk 5', exact: true }).waitFor();
    state.commentsError = false;
    await current.getByRole('button', { name: 'Try again', exact: true }).click();
    await current.getByLabel('Add a comment').waitFor();
    await current.getByRole('link', { name: 'Back to posts', exact: true }).click();
    await current.getByRole('heading', { name: 'Walk 1', exact: true }).waitFor();
    assert(current.url().includes('q=walk&sort=-likes_count'));
    assert(Math.abs(await current.evaluate(() => scrollY) - scroll) < 4, 'Return restores feed scroll');
    report.checks.push('Search, sorting and scroll survive post navigation; comment failure and retry preserve the post');
    await current.getByRole('button', { name: 'Read more', exact: true }).click();
    await current.getByRole('button', { name: 'Show less', exact: true }).waitFor();
    assert.equal(await current.getByText('Photo unavailable', { exact: true }).count(), 0);
    await current.getByRole('button', { name: 'Open full photo: Walk 2', exact: true }).click();
    await current.getByRole('dialog').waitFor();
    await current.getByRole('button', { name: 'Close', exact: true }).click();
    report.checks.push('Text-only posts, expandable captions and full-photo dialog');
    await goto(current, '/my-dog');
    await current.getByRole('button', { name: 'Delete dog profile', exact: true }).click();
    const dialog = current.getByRole('dialog');
    await dialog.getByRole('button', { name: 'Delete dog profile', exact: true }).click();
    await dialog.getByRole('alert').waitFor();
    assert(await current.getByRole('heading', { name: 'Riley', exact: true, includeHidden: true }).isVisible());
    state.deleteError = false;
    await dialog.getByRole('button', { name: 'Delete dog profile', exact: true }).click();
    await current.getByRole('link', { name: 'Add dog profile', exact: true }).waitFor();
    await current.getByRole('link', { name: 'Behaviour', exact: true }).click();
    await current.getByRole('link', { name: 'Add behaviour', exact: true }).waitFor();
    report.checks.push('Dog deletion confirms and waits for the API; failure stays actionable; missing records have creation links');
    state.deletedDog = false; state.profileError = true;
    await goto(current, '/profiles/50');
    await current.getByRole('alert').filter({ hasText: 'couldn’t load this profile' }).waitFor();
    state.profileError = false;
    await current.getByRole('button', { name: 'Try again', exact: true }).click();
    await current.getByRole('heading', { name: 'Riley', exact: true }).waitFor();
    const dogY = (await current.getByRole('heading', { name: 'Riley', exact: true }).boundingBox()).y;
    const postY = (await current.getByRole('heading', { name: 'Walk 1', exact: true }).boundingBox()).y;
    assert(dogY < postY);
    await current.getByText('Account settings', { exact: true }).click();
    assert(await current.getByRole('button', { name: 'Sign out', exact: true }).isVisible());
    await current.screenshot({ path: `${out}/profile-mobile.png`, fullPage: false });
    report.checks.push('Profile retry, dog-first summary, tabs and account settings');
    await goto(current, '/posts/create');
    await current.getByRole('textbox', { name: 'Title', exact: true }).fill('My preserved draft');
    const png = await current.evaluate(() => { const c = document.createElement('canvas'); c.width = 5000; c.height = 200; c.getContext('2d').fillRect(0, 0, 5000, 200); return c.toDataURL('image/png').split(',')[1]; });
    await current.getByLabel('Post photo', { exact: false }).setInputFiles({ name: 'phone.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
    await current.getByText('Photo resized and prepared for upload. Review the preview before posting.', { exact: true }).waitFor();
    await current.getByAltText('Selected upload preview').evaluate(image => image.decode());
    const dimensions = await current.getByAltText('Selected upload preview').evaluate(image => [image.naturalWidth, image.naturalHeight]);
    assert(Math.max(...dimensions) <= 4096 && dimensions[0] > 0);
    await current.getByRole('button', { name: 'Remove photo', exact: true }).click();
    assert.equal(await current.getByAltText('Selected upload preview').count(), 0);
    await current.getByLabel('Post photo', { exact: false }).setInputFiles({ name: 'phone.png', mimeType: 'image/png', buffer: Buffer.from(png, 'base64') });
    await current.getByText('Photo resized and prepared for upload. Review the preview before posting.', { exact: true }).waitFor();
    state.expired = true;
    await current.getByRole('button', { name: 'Post', exact: true }).click();
    await current.getByRole('link', { name: /Sign in in a new tab/ }).waitFor();
    assert.equal(await current.getByRole('textbox', { name: 'Title', exact: true }).inputValue(), 'My preserved draft');
    assert(state.upload.includes(Buffer.from('filename="phone.png"')));
    await current.screenshot({ path: `${out}/post-session-recovery.png`, fullPage: true });
    await current.reload({ waitUntil: 'networkidle' });
    assert.equal(await current.getByRole('textbox', { name: 'Title', exact: true }).inputValue(), 'My preserved draft');
    report.checks.push('Real canvas resizes a large phone image; remove/replace and expired-session recovery retain draft text, including reload');
    await current.close();
    current = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await fixtures(current, { guest: true }); await goto(current);
    await current.getByRole('link', { name: 'Explore posts', exact: true }).waitFor();
    await current.getByRole('link', { name: 'Join SpoodleSpace', exact: true }).waitFor();
    await current.screenshot({ path: `${out}/welcome-mobile.png`, fullPage: false });
    report.checks.push('Concise guest welcome with both entry actions');
    report.result = 'passed';
  } catch (error) {
    report.result = 'failed'; report.error = String(error.stack || error); process.exitCode = 1;
    if (current && !current.isClosed()) await current.screenshot({ path: `${out}/failure.png`, fullPage: true }).catch(() => {});
  } finally {
    await browser.close(); fs.writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2)); console.log(JSON.stringify(report, null, 2));
  }
})();
