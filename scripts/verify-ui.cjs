const { chromium } = require("playwright-core");
const fs = require("fs");

const baseUrl = "http://127.0.0.1:4173/spoodle-space-pp5/";
const outputDir = "verification-artifacts";
const failures = [];
const results = [];
const unsupportedLabels = [
  "Calendar",
  "Events",
  "Marketplace",
  "Stories",
  "Live Video",
  "Messages",
  "Notifications",
];

const dogSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240">
    <rect width="300" height="240" rx="24" fill="#f1e9fd"/>
    <circle cx="150" cy="116" r="70" fill="#d9aa72"/>
    <path d="M92 75 Q57 112 90 151" fill="#b77b45"/>
    <path d="M208 75 Q243 112 210 151" fill="#b77b45"/>
    <circle cx="124" cy="104" r="8" fill="#24212b"/>
    <circle cx="176" cy="104" r="8" fill="#24212b"/>
    <ellipse cx="150" cy="129" rx="15" ry="11" fill="#24212b"/>
    <path d="M126 151 Q150 171 174 151" fill="none" stroke="#24212b" stroke-width="8" stroke-linecap="round"/>
  </svg>
`);
const dogImage = `data:image/svg+xml,${dogSvg}`;

const currentUser = {
  pk: 1,
  username: "sam",
  email: "sam@example.com",
  first_name: "Sam",
  last_name: "O'Brien-Olinger",
  profile_id: 1,
  profile_image: dogImage,
};

const profiles = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 2,
      owner: "aoife",
      image: dogImage,
      following_id: null,
      posts_count: 4,
      followers_count: 12,
      following_count: 5,
    },
    {
      id: 3,
      owner: "liam",
      image: dogImage,
      following_id: null,
      posts_count: 7,
      followers_count: 9,
      following_count: 3,
    },
    {
      id: 4,
      owner: "conor",
      image: dogImage,
      following_id: 8,
      posts_count: 2,
      followers_count: 6,
      following_count: 7,
    },
  ],
};

const posts = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 11,
      owner: "aoife",
      is_owner: false,
      profile_id: 2,
      profile_image: dogImage,
      created_at: "4 Sep 2026",
      updated_at: "2 hours ago",
      title: "Sunday strolls",
      content: "A sunny walk by the lake with Luna.",
      image: dogImage,
      image_filter: "normal",
      like_id: null,
      comments_count: 4,
      likes_count: 29,
    },
    {
      id: 12,
      owner: "liam",
      is_owner: false,
      profile_id: 3,
      profile_image: dogImage,
      created_at: "4 Sep 2026",
      updated_at: "5 hours ago",
      title: "Training progress",
      content: "Riley is getting very good at stay.",
      image: dogImage,
      image_filter: "normal",
      like_id: null,
      comments_count: 2,
      likes_count: 18,
    },
  ],
};

async function mockApi(page) {
  await page.route("**/api/**", async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    let body;
    let status = 200;

    if (pathname.endsWith("/api/dj-rest-auth/user/")) body = currentUser;
    else if (pathname.includes("/api/profiles/")) body = profiles;
    else if (pathname.includes("/api/posts/")) body = posts;
    else if (
      pathname.includes("/api/dogprofiles/") ||
      pathname.includes("/api/doghealth/") ||
      pathname.includes("/api/dogdangers/")
    ) {
      body = { count: 0, next: null, previous: null, results: [] };
    } else {
      status = 404;
      body = { detail: "Mock endpoint not configured" };
    }

    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });
}

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) =>
    failedRequests.push({
      url: request.url(),
      error: request.failure()?.errorText || "unknown failure",
    })
  );

  await mockApi(page);
  const response = await page.goto(baseUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(4500);

  const metrics = await page.evaluate((labels) => {
    const text = document.body.innerText;
    const root = document.getElementById("root");
    const logo = document.querySelector('img[alt="SpoodleSpace"]');
    const visibleAsides = [...document.querySelectorAll("aside")].filter(
      (element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }
    ).length;

    return {
      title: document.title,
      bodyTextLength: text.trim().length,
      bodyTextPreview: text.trim().slice(0, 900),
      rootChildCount: root ? root.childElementCount : 0,
      logoVisible: Boolean(logo && logo.getBoundingClientRect().width > 0),
      horizontalOverflow: document.documentElement.scrollWidth - window.innerWidth,
      unsupportedLabelsFound: labels.filter((label) => text.includes(label)),
      hasCreatePost: text.includes("Create Post"),
      hasHealth: text.includes("Health"),
      hasSafety: text.includes("Safety"),
      hasLiked: text.includes("Liked"),
      hasSearch: text.includes("Search posts by owner or title"),
      hasPostContent:
        text.includes("Sunday strolls") && text.includes("Training progress"),
      visibleAsides,
    };
  }, unsupportedLabels);

  await page.screenshot({ path: `${outputDir}/${name}.png`, fullPage: true });

  if (name === "mobile") {
    const toggle = page.locator(".navbar-toggler");
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(600);
      await page.screenshot({
        path: `${outputDir}/mobile-menu.png`,
        fullPage: true,
      });
    } else {
      failures.push("mobile: navigation toggle was not rendered");
    }
  }

  const localAssetFailures = failedRequests.filter((item) =>
    item.url.startsWith(
      "http://127.0.0.1:4173/spoodle-space-pp5/static/"
    )
  );

  if (!response || response.status() >= 400)
    failures.push(`${name}: document response was not successful`);
  if (!metrics.logoVisible)
    failures.push(`${name}: original SpoodleSpace logo is not visible`);
  if (metrics.rootChildCount === 0 || metrics.bodyTextLength < 40)
    failures.push(`${name}: React rendered no meaningful content`);
  if (metrics.horizontalOverflow > 4)
    failures.push(
      `${name}: horizontal overflow is ${metrics.horizontalOverflow}px`
    );
  if (metrics.unsupportedLabelsFound.length)
    failures.push(
      `${name}: unsupported UI labels found: ${metrics.unsupportedLabelsFound.join(
        ", "
      )}`
    );
  if (
    !metrics.hasCreatePost ||
    !metrics.hasHealth ||
    !metrics.hasSafety ||
    !metrics.hasLiked
  )
    failures.push(`${name}: one or more supported feature links are missing`);
  if (!metrics.hasPostContent)
    failures.push(`${name}: mocked post feed content did not render`);
  if (name === "desktop" && !metrics.hasSearch)
    failures.push("desktop: accurate post search label is missing");
  if (name === "desktop" && metrics.visibleAsides < 2)
    failures.push(
      `desktop: expected sidebar and right rail; found ${metrics.visibleAsides} visible aside(s)`
    );
  if (pageErrors.length)
    failures.push(`${name}: ${pageErrors.length} unhandled page error(s)`);
  if (localAssetFailures.length)
    failures.push(
      `${name}: ${localAssetFailures.length} local static asset request(s) failed`
    );

  results.push({
    name,
    status: response ? response.status() : null,
    metrics,
    pageErrors,
    consoleErrors,
    failedRequests,
    localAssetFailures,
  });
  await page.close();
}

(async () => {
  if (!process.env.CHROME_PATH)
    throw new Error("CHROME_PATH was not supplied");

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  await verifyViewport(browser, "desktop", { width: 1440, height: 1000 });
  await verifyViewport(browser, "mobile", { width: 390, height: 844 });
  await browser.close();

  const report = { baseUrl, results, failures };
  fs.writeFileSync(
    `${outputDir}/verification-report.json`,
    JSON.stringify(report, null, 2)
  );
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exit(1);
})().catch((error) => {
  fs.writeFileSync(
    `${outputDir}/fatal-error.txt`,
    String(error.stack || error)
  );
  console.error(error);
  process.exit(1);
});
