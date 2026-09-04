// Pages hosts a visual preview, not server.js or its first-party /api proxy.
export const isPagesPreview =
  typeof window !== "undefined" &&
  (window.location.hostname === "github.io" ||
    window.location.hostname.endsWith(".github.io"));

// This is the frontend, not the Django API hostname. Never pass credentials in a URL.
export const liveAppOrigin = "https://spoodle-space-pp5.herokuapp.com";
export const liveAccountUrl = (action = "signin") =>
  `${liveAppOrigin}/${action === "signup" ? "signup" : "signin"}`;
