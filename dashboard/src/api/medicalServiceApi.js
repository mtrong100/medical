import axios from "./axiosConfig";

export const getMedicalServicesApi = async (params) => {
  const response = await axios.get("/medical-services", {
    params,
  });
  return response;
};

export const createMedicalServiceApi = async (data) => {
  const response = await axios.post("/medical-services/create", data);
  return response;
};

export const updateMedicalServiceApi = async (id, data) => {
  const response = await axios.put(`/medical-services/update/${id}`, data);
  return response;
};

export const deleteMedicalServiceApi = async (id) => {
  const response = await axios.delete(`/medical-services/delete/${id}`);
  return response;
};
