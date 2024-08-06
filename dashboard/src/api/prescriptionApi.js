import axios from "./axiosConfig";

export const getPrescriptionsApi = async (params) => {
  const response = await axios.get("/prescriptions", { params });
  return response;
};

export const getPrescriptionDetailApi = async (id) => {
  const response = await axios.get(`/prescriptions/${id}`);
  return response;
};

export const getPrescriptionStatsApi = async () => {
  const response = await axios.get("/prescriptions/stats");
  return response;
};

export const createPrescriptionApi = async (data) => {
  const response = await axios.post("/prescriptions/create", data);
  return response;
};

export const deletePrescriptionApi = async (id) => {
  const response = await axios.delete(`/prescriptions/delete/${id}`);
  return response;
};
