import axios from "axios";

// ✅ Base URL of your deployed Django REST API on Heroku
const baseURL = "https://spoodlespace.herokuapp.com/";

// ✅ Global Axios config
axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// ✅ Separate Axios instances for request/response interceptors if needed later
export const axiosReq = axios.create({ baseURL });
export const axiosRes = axios.create({ baseURL });



// import axios from "axios";

// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;

// export const axiosReq = axios.create();
// export const axiosRes = axios.create();
