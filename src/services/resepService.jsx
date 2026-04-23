import axios from "axios";

const API = "http://localhost:3000/api";

export const getResep = (params) => {
  return axios.get(`${API}/resepUMKM`, { params });
};

export const createResep = (data) => {
  return axios.post(`${API}/resepUMKM`, data);
};

export const searchResep = async (query) => {
  const response = await axios.get(`${API}/resepUMKM/search`, {
    params: { q: query },
  });
  return response;
};

export const deleteResep = (id) => {
  return axios.delete(`${API}/resepUMKM/${id}`);
};