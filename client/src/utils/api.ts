import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
});

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
