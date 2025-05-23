import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;

console.log("Base URL:", baseURL);
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  
});

export default apiClient;