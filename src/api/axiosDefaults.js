import axios from "axios";

axios.defaults.baseURL = "https://spoodlespace.herokuapp.com/";
// axios.defaults.baseURL = "https://8000-samobrienol-drfspoodles-0h3n7m2ipr7.ws-eu104.gitpod.io/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
