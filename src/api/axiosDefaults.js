import axios from "axios";
import { isPagesPreview } from "../config/deployment";

// Heroku runs server.js, which proxies /api/ to Django using first-party cookies.
const baseURL = "/api/";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
export const axiosReq = axios.create({ baseURL, withCredentials: true });
export const axiosRes = axios.create({ baseURL, withCredentials: true });

// GitHub Pages cannot run the proxy. Never submit credentials to a static host.
if (isPagesPreview) {
  [axios, axiosReq, axiosRes].forEach((client) => {
    client.interceptors.request.use(() => {
      const error = new Error("Live accounts and data are available on the Heroku frontend, not this design preview.");
      error.code = "STATIC_PREVIEW";
      return Promise.reject(error);
    });
  });
}
