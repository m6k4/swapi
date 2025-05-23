import axios from "axios";

const baseURL = 'https://swapi.dev/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
  
});

export default apiClient;