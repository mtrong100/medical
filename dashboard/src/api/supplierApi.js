import axios from "./axiosConfig";

export const getSupplierCollectionApi = async () => {
  const response = await axios.get("/supplier/collection");
  return response;
};

export const getSuppliersApi = async (params) => {
  const response = await axios.get("/supplier/suppliers", { params });
  return response;
};

export const getSupplierDetailApi = async (id) => {
  const response = await axios.get(`/supplier/${id}`);
  return response;
};

export const createSupplierApi = async (data) => {
  const response = await axios.post("/supplier/create", data);
  return response;
};

export const updateSupplierApi = async (id, data) => {
  const response = await axios.put(`/supplier/update/${id}`, data);
  return response;
};

export const deleteSupplierApi = async (id) => {
  const response = await axios.delete(`/supplier/delete/${id}`);
  return response;
};
