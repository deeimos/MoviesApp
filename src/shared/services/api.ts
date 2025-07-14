import axios from "axios";

const token = import.meta.env.VITE_API_TOKEN;
const url = "https://api.kinopoisk.dev";

export const api = axios.create({
  baseURL: url,
  headers: {
    "X-API-KEY": token,
  },
});
