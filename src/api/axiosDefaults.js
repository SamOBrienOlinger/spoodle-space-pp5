import axios from "axios";

// Set the base URL to your deployed Django backend on Heroku
const baseURL = "https://drf-spoodle-space-38208b5fae30.herokuapp.com/";

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create({ baseURL });
export const axiosRes = axios.create({ baseURL });


// import axios from "axios";

// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;

// export const axiosReq = axios.create();
// export const axiosRes = axios.create();
