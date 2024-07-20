import axios from "./axiosConfig";

export const getAppointmentsApi = async (params) => {
  const response = await axios.get("/appointment/appointments", { params });
  return response;
};

export const getAppointmentDetailApi = async (id) => {
  const response = await axios.get(`/appointment/${id}`);
  return response;
};

export const createAppointmentApi = async (data) => {
  const response = await axios.post("/appointment/create", data);
  return response;
};

export const updateAppointmentApi = async (id, data) => {
  const response = await axios.put(`/appointment/update/${id}`, data);
  return response;
};

export const deleteAppointmentApi = async (id) => {
  const response = await axios.delete(`/appointment/delete/${id}`);
  return response;
};
