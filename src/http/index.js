import axios from "axios";

// export const API_URL = "http://93.81.252.160:8001/api/v1/";
export const API_URL = "http://94.241.143.82:8300/api/v1/";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
