import axios from "axios";

// axios.defaults.baseURL = "https://8000-samobrienol-drfspoodles-t68akmfonum.ws-eu94.gitpod.io";
// axios.defaults.baseURL = "https://8000-samobrienol-drfspoodles-t68akmfonum.ws-eu95.gitpod.io";
axios.defaults.baseURL = "https://8000-samobrienol-drfspoodles-t68akmfonum.ws-eu96.gitpod.io";
// axios.defaults.baseURL = "https://spoodlespace.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();