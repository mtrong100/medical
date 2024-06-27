import axios from "./axiosConfig";

export const createNewPatientApi = async (data) => {
  const response = await axios.post("/patient/create", data);
  return response;
};

export const updatePatientApi = async (id, data) => {
  const response = await axios.put(`/patient/update/${id}`, data);
  return response;
};

export const deletePatientApi = async (id) => {
  const response = await axios.delete(`/patient/delete/${id}`);
  return response;
};

export const getAllPatientsApi = async (params) => {
  const response = await axios.get("/patient/get-all", { params });
  return response;
};
