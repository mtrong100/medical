import axios from "./axiosConfig";

export const createNewMedicalRecordApi = async (data) => {
  const response = await axios.post("/medical-record/create", data);
  return response;
};

export const updateMedicalRecordApi = async (id, data) => {
  const response = await axios.put(`/medical-record/update/${id}`, data);
  return response;
};

export const deleteMedicalRecordApi = async (id) => {
  const response = await axios.delete(`/medical-record/delete/${id}`);
  return response;
};

export const getAllMedicalRecordsApi = async (params) => {
  const response = await axios.get("/medical-record/get-all", { params });
  return response;
};

export const getMedicalRecordDetailApi = async (id) => {
  const response = await axios.get(`/medical-record/${id}`);
  return response;
};
