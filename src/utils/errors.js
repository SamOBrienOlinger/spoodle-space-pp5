export const isSessionError = error => error.response?.status === 401 ||
  (error.response?.status === 403 && /authenticat|sign in|credentials/i.test(JSON.stringify(error.response?.data)));

export function errorMessage(error, subject = "this content") {
  if (isSessionError(error)) return "Your session has expired. Sign in again, then retry. Your draft is still on this page.";
  if (error.response?.status === 404) return "This item is no longer available.";
  if (error.response?.status === 403) return "You don’t have permission to change this item.";
  if (error.response?.status === 413) return "This image is too large. Choose an image up to 2 MB.";
  if (error.code === "STATIC_PREVIEW") return "This design preview cannot load account records. Open the live app to continue.";
  return `We couldn’t load ${subject}. Check your connection and try again.`;
}

export function formErrors(error) {
  if (isSessionError(error)) return { session: true, non_field_errors: [errorMessage(error)] };
  if (error.response?.status === 413) return { image: [errorMessage(error)] };
  const data = error.response?.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const entries = Object.entries(data).map(([key, value]) => [key, (Array.isArray(value) ? value : [value]).filter(item => typeof item === "string" && item.trim())]);
    if (entries.some(([, value]) => value.length)) return Object.fromEntries(entries);
  }
  return { non_field_errors: ["Your changes couldn’t be saved. Please try again."] };
}
