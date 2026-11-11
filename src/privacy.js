// Optional draft storage is separate from the API's necessary authentication cookies.
export const PRIVACY_KEY = 'spoodlespace:privacy:v1';
export const PRIVACY_EVENT = 'spoodlespace:privacychange';
const VERSION = '2026-11-11.1';
const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
let volatileChoice = null;
const isDraftKey = key => typeof key === 'string' &&
  (key === 'spoodle-preview-post' || /^spoodle-post:[^:]+:[^:]+$/.test(key));

export function clearSavedDrafts() {
  try {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (isDraftKey(key)) keys.push(key);
    }
    keys.forEach(key => sessionStorage.removeItem(key));
  } catch (_) { /* Browser storage is optional and can be unavailable. */ }
}
export function readPrivacyChoice() {
  let value = volatileChoice;
  if (!value) { try { value = JSON.parse(localStorage.getItem(PRIVACY_KEY)); } catch (_) {} }
  if (!value || value.version !== VERSION || typeof value.drafts !== 'boolean' ||
      !Number.isFinite(value.at) || value.at > Date.now() || Date.now() - value.at >= MAX_AGE) {
    volatileChoice = null;
    clearSavedDrafts();
    return null;
  }
  if (!value.drafts) clearSavedDrafts();
  return value;
}
export function draftsAllowed() { return readPrivacyChoice()?.drafts === true; }
export function savePrivacyChoice(drafts) {
  const value = { version: VERSION, at: Date.now(), drafts: drafts === true };
  let persistent = true;
  try { localStorage.setItem(PRIVACY_KEY, JSON.stringify(value)); volatileChoice = null; }
  catch (_) {
    volatileChoice = value; persistent = false;
    try { localStorage.removeItem(PRIVACY_KEY); } catch (_) {}
  }
  if (!value.drafts) clearSavedDrafts();
  window.dispatchEvent(new CustomEvent(PRIVACY_EVENT));
  return { ...value, persistent };
}
export function readDraft(key) {
  if (!isDraftKey(key) || !draftsAllowed()) return null;
  try { return sessionStorage.getItem(key); } catch (_) { return null; }
}
export function writeDraft(key, value) {
  if (!isDraftKey(key) || !draftsAllowed()) return false;
  try { sessionStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
}
export function removeDraft(key) {
  if (!isDraftKey(key)) return;
  try { sessionStorage.removeItem(key); } catch (_) {}
}
