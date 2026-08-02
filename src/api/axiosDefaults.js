import axios from "axios";

// Base URL of deployed Django REST API
const baseURL = "https://spoodlespace.herokuapp.com/";

// Global Axios config
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

// Axios instances for request/response interceptors
export const axiosReq = axios.create({ baseURL });
export const axiosRes = axios.create({ baseURL });

// Ensure axios instances also send cookies
axiosReq.defaults.withCredentials = true;
axiosRes.defaults.withCredentials = true;
