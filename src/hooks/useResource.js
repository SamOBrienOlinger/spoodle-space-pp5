import { useCallback, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export default function useResource(url, list = false) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt(n => n + 1), []);
  useEffect(() => {
    let active = true;
    setState({ data: null, loading: Boolean(url), error: null });
    if (url) axiosReq.get(url, { timeout: 20000 }).then(({ data }) => {
      if (!data || (list ? !Array.isArray(data.results) : data.id == null)) throw new Error("Invalid API response");
      if (active) setState({ data, loading: false, error: null });
    }).catch(error => { if (active) setState({ data: null, loading: false, error }); });
    return () => { active = false; };
  }, [url, list, attempt]);
  const setData = useCallback(updater => setState(prev => ({ ...prev, data: typeof updater === "function" ? updater(prev.data) : updater })), []);
  return { ...state, retry, setData };
}
