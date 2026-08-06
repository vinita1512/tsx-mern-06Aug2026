import axios from "axios";

const swapi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default swapi;