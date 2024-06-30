import axios from "./axiosConfig";

export const createNewMedicalServiceInvoiceApi = async (data) => {
  const response = await axios.post("/medical-service-invoice/create", data);
  return response;
};

export const updateMedicalServiceInvoiceApi = async (id, data) => {
  const response = await axios.put(
    `/medical-service-invoice/update/${id}`,
    data
  );
  return response;
};

export const ddeleteMedicalServiceInvoiceApi = async (id) => {
  const response = await axios.delete(`/medical-service-invoice/delete/${id}`);
  return response;
};

export const getAllMedicalServiceInvoicesApi = async (params) => {
  const response = await axios.get("/medical-service-invoice/get-all", {
    params,
  });
  return response;
};

export const getMedicalServiceInvoiceDetailApi = async (id) => {
  const response = await axios.get(`/medical-service-invoice/${id}`);
  return response;
};
