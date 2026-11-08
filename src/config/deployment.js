// Pages hosts a visual preview, not server.js or its first-party /api proxy.
export const isPagesPreview =
  process.env.REACT_APP_PAGES_PREVIEW === "true" ||
  (typeof window !== "undefined" &&
    (window.location.hostname === "github.io" ||
      window.location.hostname.endsWith(".github.io")));

export const previewDogData = {
  path: "/my-dog/",
  label: "Doggy data",
  records: [
    ["profile", "Doggy profile"],
    ["health", "Doggy health"],
    ["behaviour", "Doggy danger"],
  ],
};

export const previewNavigation = [
  ["/", "home", "Home"],
  ["/search/", "search", "Search"],
  ["/posts/create/", "plus", "Post"],
  [previewDogData.path, "dog", previewDogData.label],
  ["/profile/", "user", "Profile"],
];

// This is the frontend, not the Django API hostname. Never pass credentials in a URL.
export const liveAppOrigin = "https://spoodle-space-pp5.herokuapp.com";
export const liveAccountUrl = (action = "signin") =>
  `${liveAppOrigin}/${action === "signup" ? "signup" : "signin"}`;
