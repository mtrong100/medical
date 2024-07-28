import axios from "./axiosConfig";

export const getSupplierCollectionApi = async () => {
  const response = await axios.get("/suppliers/collection");
  return response;
};

export const getSuppliersApi = async (params) => {
  const response = await axios.get("/suppliers", { params });
  return response;
};

export const getSupplierDetailApi = async (id) => {
  const response = await axios.get(`/suppliers/${id}`);
  return response;
};

export const createSupplierApi = async (data) => {
  const response = await axios.post("/suppliers/create", data);
  return response;
};

export const updateSupplierApi = async (id, data) => {
  const response = await axios.put(`/suppliers/update/${id}`, data);
  return response;
};

export const deleteSupplierApi = async (id) => {
  const response = await axios.delete(`/suppliers/delete/${id}`);
  return response;
};
