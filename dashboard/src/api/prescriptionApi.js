import axios from "./axiosConfig";

export const getPrescriptionsApi = async (params) => {
  const response = await axios.get("/prescription/prescriptions", { params });
  return response;
};

export const getPrescriptionDetailApi = async (id) => {
  const response = await axios.get(`/prescription/${id}`);
  return response;
};

export const createPrescriptionApi = async (data) => {
  const response = await axios.post("/prescription/create", data);
  return response;
};

export const updatePrescriptionApi = async (id, data) => {
  const response = await axios.put(`/prescription/update/${id}`, data);
  return response;
};

export const deletePrescriptionApi = async (id) => {
  const response = await axios.delete(`/prescription/delete/${id}`);
  return response;
};
