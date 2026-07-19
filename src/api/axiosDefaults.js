import axios from "axios";

// ✅ Base URL of your deployed Django REST API on Heroku
const baseURL = "https://spoodlespace.herokuapp.com/";

// ✅ Global Axios config
axios.defaults.baseURL = baseURL;
// Do NOT force multipart/form-data globally — let JSON requests use the default application/json
// and use FormData only for file uploads.
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// ✅ Separate Axios instances for request/response interceptors if needed later
export const axiosReq = axios.create({ baseURL });
export const axiosRes = axios.create({ baseURL });
