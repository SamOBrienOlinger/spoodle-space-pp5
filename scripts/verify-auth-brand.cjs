const { chromium } = require('playwright-core');
const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert').strict;
const output = 'verification-artifacts';
const base = process.env.VERIFY_BASE_URL || 'http://127.0.0.1:4173/spoodle-space-pp5/';
const preview = 'https://samobrienolinger.github.io/spoodle-space-pp5/';
const live = 'https://spoodle-space-pp5.herokuapp.com';
const report = { sourceCommit: process.env.SOURCE_SHA, widths: [], previewRoutes: [], authScenarios: [], liveProbes: [], liveAccountCredentialsTested: false };
fs.mkdirSync(output, { recursive: true });

async function previewChecks(browser) {
  const original = fs.readFileSync('src/assets/logo2-spoodlespace.png');
  const blobSha = crypto.createHash('sha1').update(`blob ${original.length}\0`).update(original).digest('hex');
  assert.equal(blobSha, '8d5d037c658b000a8d3d92be888cf479d3adcd8e', 'Original logo must remain unchanged');
  report.originalLogoBlob = blobSha;
  for (const width of [320, 390, 430, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    const apiCalls = [];
    page.on('pageerror', error => errors.push(error.message));
    // Serve the real compiled files under a Pages origin; no API fixtures are supplied.
    await page.route('https://samobrienolinger.github.io/**', async route => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith('/api/')) {
        apiCalls.push({ method: route.request().method(), path: url.pathname });
        return route.fulfill({ status: 405, body: 'Static host cannot accept API requests' });
      }
      const response = await page.request.get(new URL(url.pathname + url.search, base).href);
      await route.fulfill({ response });
    });
    await page.goto(preview, { waitUntil: 'networkidle' });
    await page.locator('text=Design preview.').waitFor();
    const metrics = await page.evaluate(() => {
      const nav = document.querySelector('nav.navbar');
      const logo = document.querySelector('img[alt="SpoodleSpace"]');
      const style = getComputedStyle(nav);
      const rect = logo.getBoundingClientRect();
      return { background: style.backgroundColor, backgroundImage: style.backgroundImage, logoLoaded: logo.complete && logo.naturalWidth === 754, overflow: document.documentElement.scrollWidth - innerWidth, logoBounds: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } };
    });
    assert.equal(metrics.background, 'rgb(113, 17, 238)');
    assert.equal(metrics.backgroundImage, 'none');
    assert.equal(metrics.logoLoaded, true);
    assert(metrics.overflow <= 1, `Overflow at ${width}px`);
    assert.deepEqual(apiCalls, [], 'No live API requests should be sent to Pages');
    await page.screenshot({ path: `${output}/header-${width}.png`, fullPage: true });
    if (width < 992) {
      await page.getByRole('button', { name: 'Toggle navigation' }).click();
      await page.waitForTimeout(350);
      assert.equal(await page.locator('nav.navbar').evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(113, 17, 238)');
      assert.equal(await page.locator('nav a').filter({ hasText: /^Sign in$/ }).last().getAttribute('href'), `${live}/signin`);
      if (width === 390) await page.screenshot({ path: `${output}/mobile-menu.png`, fullPage: true });
    }
    for (const action of ['signin', 'signup']) {
      await page.goto(preview + action, { waitUntil: 'networkidle' });
      await page.locator('#live-account-heading').waitFor();
      assert.equal(await page.locator('input[type="password"]').count(), 0, 'Pages must not collect passwords');
      const name = action === 'signin' ? 'Continue to Heroku sign-in' : 'Create account on Heroku';
      assert.equal(await page.getByRole('link', { name, exact: true }).getAttribute('href'), `${live}/${action}`);
      assert.deepEqual(apiCalls, []);
      report.previewRoutes.push({ width, action, passwordInputs: 0, liveAccountLink: `${live}/${action}` });
      if (width === 390 && action === 'signin') await page.screenshot({ path: `${output}/preview-signin-mobile.png`, fullPage: true });
    }
    assert.deepEqual(errors, []);
    report.widths.push({ width, ...metrics, unhandledErrors: errors, apiCalls });
    await page.close();
  }
}

async function authChecks(browser) {
  for (const scenario of ['invalid-credentials', 'html-405', 'network-failure', 'missing-session', 'success']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errors = [];
    let loginRequests = 0;
    let authenticatedUserRequests = 0;
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/api/**', async route => {
      const request = route.request();
      const url = new URL(request.url());
      assert.equal(url.origin, new URL(base).origin, 'Credentials must stay on the frontend origin');
      const cookie = (await request.allHeaders()).cookie || '';
      const authenticated = cookie.includes('spoodle_fixture_session=verified');
      const json = (body, status = 200, headers = {}) => route.fulfill({ status, headers, contentType: 'application/json', body: JSON.stringify(body) });
      if (url.pathname.endsWith('/login/')) {
        loginRequests += 1;
        if (scenario === 'network-failure') return route.abort('failed');
        if (scenario === 'html-405') return route.fulfill({ status: 405, contentType: 'text/html', body: '<h1>405 Not Allowed</h1>' });
        if (scenario === 'invalid-credentials') return json({ non_field_errors: ['Unable to log in with provided credentials.'] }, 400);
        const headers = scenario === 'success' ? { 'set-cookie': 'spoodle_fixture_session=verified; Path=/; HttpOnly; SameSite=Lax' } : {};
        return json({ user: { username: 'fixture-user', profile_id: 1 }, access_token: '' }, 200, headers);
      }
      if (url.pathname.endsWith('/user/')) {
        if (authenticated) {
          authenticatedUserRequests += 1;
          return json({ pk: 1, username: 'fixture-user', profile_id: 1, profile_image: '/spoodle-space-pp5/favicon.ico' });
        }
        return json({ detail: 'Authentication credentials were not provided.' }, 401);
      }
      if (url.pathname.endsWith('/token/refresh/')) return json(authenticated ? {} : { detail: 'No refresh cookie.' }, authenticated ? 200 : 401);
      return json({ count: 0, next: null, previous: null, results: [] });
    });
    await page.goto(base + 'signin', { waitUntil: 'networkidle' });
    await page.getByLabel('Username', { exact: true }).fill('fixture-user');
    await page.getByLabel('Password', { exact: true }).fill('not-a-real-password');
    if (scenario === 'success') await page.screenshot({ path: `${output}/heroku-mode-signin-mobile.png`, fullPage: true });
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    if (scenario === 'success') {
      await page.waitForURL(base + 'feed');
      assert(authenticatedUserRequests >= 1, 'Authenticated cookie-backed user check must pass');
      assert.equal(new URL(page.url()).origin, new URL(base).origin, 'Success must not return to Pages');
    } else {
      await page.getByRole('alert').first().waitFor();
      assert.equal(page.url(), base + 'signin');
      const expected = { 'invalid-credentials': 'Unable to log in', 'html-405': 'unavailable at this address', 'network-failure': 'could not be reached', 'missing-session': 'Authentication credentials' }[scenario];
      assert((await page.getByRole('alert').first().innerText()).includes(expected));
      assert.equal(await page.getByRole('button', { name: 'Sign in', exact: true }).isEnabled(), true);
    }
    assert.equal(loginRequests, 1);
    assert.deepEqual(errors, []);
    report.authScenarios.push({ scenario, loginRequests, authenticatedUserRequests, finalUrl: page.url(), unhandledErrors: errors, api: 'local deterministic fixtures; not live account credentials' });
    await page.close();
  }
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ['--no-sandbox'] });
  try {
    await previewChecks(browser);
    await authChecks(browser);
    const request = await browser.newContext();
    for (const url of [live + '/signin', live + '/api/dj-rest-auth/login/', 'https://spoodlespace.herokuapp.com/dj-rest-auth/login/']) {
      const isLogin = url.endsWith('/login/');
      const response = isLogin ? await request.request.post(url, { data: {}, timeout: 30000 }) : await request.request.get(url, { timeout: 30000 });
      const contentType = response.headers()['content-type'] || '';
      report.liveProbes.push({ url, method: isLogin ? 'POST with empty JSON; no credentials' : 'GET', status: response.status(), contentType });
      assert.equal(response.status(), isLogin ? 400 : 200);
      if (isLogin) assert(contentType.includes('application/json'));
    }
    await request.close();
    report.result = 'passed';
  } catch (error) {
    report.result = 'failed';
    report.failure = String(error.stack || error);
    process.exitCode = 1;
  } finally {
    await browser.close();
    fs.writeFileSync(`${output}/auth-brand-report.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  }
})();
