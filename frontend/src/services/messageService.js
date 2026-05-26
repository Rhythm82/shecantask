import api from "../api/axios.js";

export const createMessage = (payload) => api.post("/messages", payload);

export const getMessages = (params = {}) => api.get("/messages", { params });

export const getMessageStats = () => api.get("/messages/stats");

export const updateMessageStatus = (id, status) => api.patch(`/messages/${id}/status`, { status });

export const deleteMessageById = (id) => api.delete(`/messages/${id}`);
