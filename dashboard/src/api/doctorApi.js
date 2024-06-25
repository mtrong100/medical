import axios from "./axiosConfig";

export const getAllDoctorsApi = async () => {
  const response = await axios.get("/doctor/get-all");
  return response;
};

export const createNewDoctorApi = async (data) => {
  const response = await axios.post("/doctor/create", data);
  return response;
};

export const updateDoctorApi = async (doctorId, data) => {
  const response = await axios.put(`/doctor/update/${doctorId}`, data);
  return response;
};

export const deleteDoctorApi = async (doctorId) => {
  const response = await axios.delete(`/doctor/delete/${doctorId}`);
  return response;
};

export const getDoctorDetailApi = async (doctorId) => {
  const response = await axios.get(`/doctor/${doctorId}`);
  return response;
};

export const firedDoctorApi = async (doctorId, data) => {
  const response = await axios.put(`/doctor/fired/${doctorId}`, data);
  return response;
};

export const lockDoctorApi = async (doctorId) => {
  const response = await axios.put(`/doctor/lock/${doctorId}`);
  return response;
};

export const doctorlogin = async (data) => {
  const response = await axios.post("/doctor/login", data);
  return response;
};
