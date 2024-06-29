import axios from "./axiosConfig";

export const createNewMedicalServiceApi = async (data) => {
  const response = await axios.post("/medical-service/create", data);
  return response;
};

export const updateMedicalServiceApi = async (id, data) => {
  const response = await axios.put(`/medical-service/update/${id}`, data);
  return response;
};

export const deleteMedicalServiceApi = async (id) => {
  const response = await axios.delete(`/medical-service/delete/${id}`);
  return response;
};

export const getAllMedicalServicesApi = async () => {
  const response = await axios.get("/medical-service/get-all");
  return response;
};
