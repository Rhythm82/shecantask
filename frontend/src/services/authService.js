import api from "../api/axios.js";

export const registerAdmin = (payload) => api.post("/auth/register", payload);

export const loginAdmin = (payload) => api.post("/auth/login", payload);

export const getCurrentAdmin = () => api.get("/auth/me");
