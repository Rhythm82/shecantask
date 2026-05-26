import api from "../api/axios.js";

export const createDonationOrder = (payload) => api.post("/donations/create-order", payload);

export const verifyDonationPayment = (payload) => api.post("/donations/verify-payment", payload);

export const getDonations = (params = {}) => api.get("/donations", { params });

export const getDonationStats = () => api.get("/donations/stats");
