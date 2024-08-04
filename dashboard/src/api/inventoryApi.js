import axios from "./axiosConfig";

export const getInventoriesApi = async (params) => {
  const response = await axios.get("/inventories", { params });
  return response;
};

export const getInventoryStatsApi = async () => {
  const response = await axios.get(`/inventories/stats`);
  return response;
};

export const getInventoryDetailApi = async (id) => {
  const response = await axios.get(`/inventories/${id}`);
  return response;
};

export const createInventoryApi = async (data) => {
  const response = await axios.post("/inventories/create", data);
  return response;
};

export const updateInventoryApi = async (id) => {
  const response = await axios.put(`/inventories/update/${id}`);
  return response;
};

export const deleteInventoryApi = async (id) => {
  const response = await axios.delete(`/inventories/delete/${id}`);
  return response;
};
