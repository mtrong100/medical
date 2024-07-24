import axios from "./axiosConfig";

export const getInventoriesApi = async (params) => {
  const response = await axios.get("/inventory/inventories", { params });
  return response;
};

export const getInventoryDetailApi = async (id) => {
  const response = await axios.get(`/inventory/${id}`);
  return response;
};

export const createInventoryApi = async (data) => {
  const response = await axios.post("/inventory/create", data);
  return response;
};

export const deleteInventoryApi = async (id) => {
  const response = await axios.delete(`/inventory/delete/${id}`);
  return response;
};
