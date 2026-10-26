import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { isPagesPreview } from "../config/deployment";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
const AuthReadyContext = createContext(false);
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useAuthReady = () => useContext(AuthReadyContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    let refresh;
    const clients = [axiosReq, axiosRes];
    const interceptors = clients.map(client => client.interceptors.response.use(response => response, async error => {
      const config = error.config;
      if (!config || error.response?.status !== 401 || config._retried || isPagesPreview) return Promise.reject(error);
      config._retried = true;
      try {
        if (!refresh) refresh = axios.post("/dj-rest-auth/token/refresh/", {}, { timeout: 20000 }).finally(() => { refresh = null; });
        await refresh;
      } catch (_) {
        // Stay on the form so a failed refresh cannot throw away a draft.
        return Promise.reject(error);
      }
      return client(config);
    }));
    if (isPagesPreview) setReady(true);
    else axiosRes.get("/dj-rest-auth/user/", { timeout: 20000 }).then(({ data }) => {
      if (active && typeof data?.username === "string") setCurrentUser(data);
    }).catch(() => {}).finally(() => { if (active) setReady(true); });
    return () => { active = false; clients.forEach((client, i) => client.interceptors.response.eject(interceptors[i])); };
  }, []);
  return <CurrentUserContext.Provider value={currentUser}><SetCurrentUserContext.Provider value={setCurrentUser}><AuthReadyContext.Provider value={ready}>{children}</AuthReadyContext.Provider></SetCurrentUserContext.Provider></CurrentUserContext.Provider>;
};
