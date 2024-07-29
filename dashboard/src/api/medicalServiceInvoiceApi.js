import axios from "./axiosConfig";

export const getMedicalServiceInvoicesApi = async (params) => {
  const response = await axios.get("/medical-service-invoices", {
    params,
  });
  return response;
};

export const getMedicalServiceInvoiceDetailApi = async (id) => {
  const response = await axios.get(`/medical-service-invoices/${id}`);
  return response;
};

export const createMedicalServiceInvoiceApi = async (data) => {
  const response = await axios.post("/medical-service-invoices/create", data);
  return response;
};

export const updateMedicalServiceInvoiceApi = async (id, data) => {
  const response = await axios.put(
    `/medical-service-invoices/update/${id}`,
    data
  );
  return response;
};

export const deleteMedicalServiceInvoiceApi = async (id) => {
  const response = await axios.delete(`/medical-service-invoices/delete/${id}`);
  return response;
};
