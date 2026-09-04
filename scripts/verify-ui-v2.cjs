const { chromium } = require("playwright-core");
const fs = require("fs");

const baseUrl = "http://127.0.0.1:4173/spoodle-space-pp5/";
const outputDir = "verification-artifacts";
const failures = [];
const results = [];
const unsupportedLabels = [
  "calendar",
  "events",
  "marketplace",
  "stories",
  "live video",
  "messages",
  "notifications",
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
    { id: 2, owner: "aoife", image: dogImage, following_id: null },
    { id: 3, owner: "liam", image: dogImage, following_id: null },
    { id: 4, owner: "conor", image: dogImage, following_id: 8 },
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

function addFailure(message) {
  if (!failures.includes(message)) failures.push(message);
}

async function verifyViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  const httpErrors = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      error: request.failure()?.errorText || "unknown failure",
    });
  });
  page.on("response", (response) => {
    if (response.status() >= 400) {
      httpErrors.push({ url: response.url(), status: response.status() });
    }
  });

  await mockApi(page);
  const response = await page.goto(baseUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(4500);

  await page.screenshot({
    path: `${outputDir}/${name}.png`,
    fullPage: true,
  });

  let mobileMenuOpened = false;
  let mobileToggleSize = null;
  if (name === "mobile") {
    const toggle = page.locator(".navbar-toggler");
    if ((await toggle.count()) !== 1) {
      addFailure("mobile: exactly one navigation toggle was expected");
    } else {
      const box = await toggle.boundingBox();
      mobileToggleSize = box
        ? { width: Math.round(box.width), height: Math.round(box.height) }
        : null;
      if (!box || box.width < 44 || box.height < 44) {
        addFailure("mobile: navigation toggle is smaller than 44px");
      }
      await toggle.click();
      await page.waitForTimeout(600);
      mobileMenuOpened = true;
      await page.screenshot({
        path: `${outputDir}/mobile-menu.png`,
        fullPage: true,
      });
    }
  }

  const metrics = await page.evaluate(
    ({ labels, viewportName, menuOpened }) => {
      const isVisible = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0"
        );
      };

      const text = document.body.innerText.trim();
      const lowerText = text.toLowerCase();
      const root = document.getElementById("root");
      const logo = document.querySelector('img[alt="SpoodleSpace"]');
      const navBar = document.querySelector("nav.navbar");
      const navText = navBar ? navBar.innerText.toLowerCase() : "";
      const searchInputs = [...document.querySelectorAll(
        'input[aria-label="Search posts by owner or title"]'
      )];
      const visibleSearchInputs = searchInputs.filter(isVisible);
      const visibleAsides = [...document.querySelectorAll("aside")].filter(
        isVisible
      );
      const navRect = navBar ? navBar.getBoundingClientRect() : null;
      const purple = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--spoodle-purple")
        .trim()
        .toLowerCase();

      return {
        title: document.title,
        bodyTextLength: text.length,
        bodyTextPreview: text.slice(0, 1000),
        rootChildCount: root ? root.childElementCount : 0,
        logoVisible: isVisible(logo),
        searchInputCount: searchInputs.length,
        visibleSearchInputCount: visibleSearchInputs.length,
        horizontalOverflow:
          document.documentElement.scrollWidth - window.innerWidth,
        unsupportedLabelsFound: labels.filter((label) =>
          lowerText.includes(label)
        ),
        hasCreatePost: lowerText.includes("create post"),
        hasHealth: lowerText.includes("health records"),
        hasSafety: lowerText.includes("safety & dangers"),
        hasLiked: lowerText.includes("liked posts"),
        hasPostContent:
          lowerText.includes("sunday strolls") &&
          lowerText.includes("training progress"),
        visibleAsideCount: visibleAsides.length,
        postCardCount: document.querySelectorAll(".card").length,
        mobileMenuOpened: viewportName === "mobile" ? menuOpened : null,
        navContainedInViewport: Boolean(
          navRect && navRect.left >= -1 && navRect.right <= window.innerWidth + 1
        ),
        duplicateDesktopNavigation:
          viewportName === "desktop" &&
          ["following feed", "health records", "safety & dangers"].some(
            (label) => navText.includes(label)
          ),
        originalPurpleToken: purple,
      };
    },
    { labels: unsupportedLabels, viewportName: name, menuOpened: mobileMenuOpened }
  );

  const localNetworkFailures = failedRequests.filter((item) =>
    item.url.startsWith("http://127.0.0.1:4173/")
  );
  const localHttpErrors = httpErrors.filter((item) =>
    item.url.startsWith("http://127.0.0.1:4173/")
  );

  if (!response || response.status() >= 400)
    addFailure(`${name}: document response was not successful`);
  if (!metrics.logoVisible)
    addFailure(`${name}: original SpoodleSpace logo is not visible`);
  if (metrics.visibleSearchInputCount < 1)
    addFailure(`${name}: accurate post search control is not visible`);
  if (metrics.rootChildCount === 0 || metrics.bodyTextLength < 40)
    addFailure(`${name}: React rendered no meaningful content`);
  if (metrics.horizontalOverflow > 4)
    addFailure(`${name}: horizontal overflow is ${metrics.horizontalOverflow}px`);
  if (!metrics.navContainedInViewport)
    addFailure(`${name}: top navigation is clipped outside the viewport`);
  if (metrics.unsupportedLabelsFound.length)
    addFailure(
      `${name}: unsupported UI labels found: ${metrics.unsupportedLabelsFound.join(
        ", "
      )}`
    );
  if (
    !metrics.hasCreatePost ||
    !metrics.hasHealth ||
    !metrics.hasSafety ||
    !metrics.hasLiked
  ) {
    addFailure(`${name}: one or more supported feature links are missing`);
  }
  if (!metrics.hasPostContent || metrics.postCardCount < 2)
    addFailure(`${name}: mocked post feed content did not render completely`);
  if (metrics.originalPurpleToken !== "#7112ee")
    addFailure(`${name}: original #7112ee purple token is not active`);
  if (name === "desktop" && metrics.visibleAsideCount < 2)
    addFailure(
      `desktop: expected sidebar and right rail; found ${metrics.visibleAsideCount} visible aside(s)`
    );
  if (name === "desktop" && metrics.duplicateDesktopNavigation)
    addFailure("desktop: mobile navigation is duplicated across the top bar");
  if (name === "mobile" && !metrics.mobileMenuOpened)
    addFailure("mobile: navigation menu did not open");
  if (name === "mobile" && metrics.visibleAsideCount !== 0)
    addFailure("mobile: desktop sidebars remain visible");
  if (pageErrors.length)
    addFailure(`${name}: ${pageErrors.length} unhandled page error(s)`);
  if (localNetworkFailures.length)
    addFailure(
      `${name}: ${localNetworkFailures.length} local request(s) failed before receiving a response`
    );
  if (localHttpErrors.length)
    addFailure(`${name}: ${localHttpErrors.length} local HTTP error response(s)`);

  results.push({
    name,
    status: response ? response.status() : null,
    metrics,
    mobileToggleSize,
    pageErrors,
    consoleErrors,
    failedRequests,
    httpErrors,
    localNetworkFailures,
    localHttpErrors,
  });

  await page.close();
}

(async () => {
  if (!process.env.CHROME_PATH) {
    throw new Error("CHROME_PATH was not supplied");
  }

  fs.mkdirSync(outputDir, { recursive: true });
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
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    `${outputDir}/fatal-error.txt`,
    String(error.stack || error)
  );
  console.error(error);
  process.exit(1);
});
