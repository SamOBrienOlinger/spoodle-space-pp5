import { useEffect, useState } from "react";
// Only non-secret text is retained, scoped to this tab, account and form.
export default function useDraft(key, initial) {
  const read = () => { try { return JSON.parse(sessionStorage.getItem(key)) || initial; } catch (_) { return initial; } };
  const [value, setValue] = useState(read);
  useEffect(() => { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }, [key, value]);
  const clear = () => { try { sessionStorage.removeItem(key); } catch (_) {} };
  return [value, setValue, clear];
}
