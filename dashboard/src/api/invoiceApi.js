import axios from "./axiosConfig";

export const createNewInvoiceApi = async (data) => {
  const response = await axios.post("/invoice/create", data);
  return response;
};

export const updatePupdateInvoiceApi = async (id, data) => {
  const response = await axios.put(`/invoice/update/${id}`, data);
  return response;
};

export const deleteInvoiceApi = async (id) => {
  const response = await axios.delete(`/invoice/delete/${id}`);
  return response;
};

export const getAllInvoicesApi = async (params) => {
  const response = await axios.get("/invoice/get-all", { params });
  return response;
};

export const getInvoiceDetailApi = async (id) => {
  const response = await axios.get(`/invoice/${id}`);
  return response;
};
