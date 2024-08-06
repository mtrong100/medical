import axios from "./axiosConfig";

export const getInvoicesApi = async (params) => {
  const response = await axios.get("/invoices", { params });
  return response;
};

export const getInvoiceDetailApi = async (id) => {
  const response = await axios.get(`/invoices/${id}`);
  return response;
};

export const getInvoiceStatsApi = async () => {
  const response = await axios.get("/invoices/stats");
  return response;
};

export const createInvoiceApi = async (data) => {
  const response = await axios.post("/invoices/create", data);
  return response;
};

export const updatePupdateInvoiceApi = async (id, data) => {
  const response = await axios.put(`/invoices/update/${id}`, data);
  return response;
};

export const deleteInvoiceApi = async (id) => {
  const response = await axios.delete(`/invoices/delete/${id}`);
  return response;
};
