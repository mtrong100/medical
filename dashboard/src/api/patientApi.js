import axios from "./axiosConfig";

export const getPatientsApi = async (params) => {
  const response = await axios.get("/patients", { params });
  return response;
};

export const getPatientDetailApi = async (id) => {
  const response = await axios.get(`/patients/${id}`);
  return response;
};

export const getPatientStatsApi = async () => {
  const response = await axios.get("/patients/stats");
  return response;
};

export const createPatientApi = async (data) => {
  const response = await axios.post("/patients/create", data);
  return response;
};

export const updatePatientApi = async (id, data) => {
  const response = await axios.put(`/patients/update/${id}`, data);
  return response;
};

export const deletePatientApi = async (id) => {
  const response = await axios.delete(`/patients/delete/${id}`);
  return response;
};
