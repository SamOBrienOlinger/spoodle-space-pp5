import axios from "axios";

// axios.defaults.baseURL = "https://samobrienol-drfspoodles-ufklcxsviem.ws-eu101.gitpod.io";

axios.defaults.baseURL = "https://8000-samobrienol-drfspoodles-ufklcxsviem.ws-eu101.gitpod.io";

// axios.defaults.baseURL = "https://spoodlespace.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
