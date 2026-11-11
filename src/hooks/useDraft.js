import { useEffect, useRef, useState } from "react";
import { PRIVACY_KEY, PRIVACY_EVENT, readDraft, writeDraft, removeDraft, draftsAllowed } from "../privacy";
// Only consented, non-secret post text is retained, scoped to this tab/account/form.
export default function useDraft(key, initial) {
  const read = () => {
    try {
      const value = JSON.parse(readDraft(key));
      return value && typeof value === "object" && !Array.isArray(value) ? value : initial;
    } catch (_) { return initial; }
  };
  const [value, setValue] = useState(read);
  const mounted = useRef(false);
  useEffect(() => {
    // Do not save an empty placeholder while an edit is still loading.
    if (!mounted.current) { mounted.current = true; return; }
    writeDraft(key, value);
  }, [key, value]);
  useEffect(() => {
    const changed = () => { if (!draftsAllowed()) removeDraft(key); };
    const storage = event => { if (event.key === PRIVACY_KEY || event.key === null) changed(); };
    window.addEventListener(PRIVACY_EVENT, changed);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(PRIVACY_EVENT, changed);
      window.removeEventListener("storage", storage);
    };
  }, [key]);
  const clear = () => removeDraft(key);
  return [value, setValue, clear];
}
