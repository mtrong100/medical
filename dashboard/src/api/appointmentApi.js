import axios from "./axiosConfig";

export const getAppointmentsApi = async (params) => {
  const response = await axios.get("/appointments", { params });
  return response;
};

export const getAppointmentDetailApi = async (id) => {
  const response = await axios.get(`/appointments/${id}`);
  return response;
};

export const getAppointmentStatsApi = async () => {
  const response = await axios.get("/appointments/stats");
  return response;
};

export const createAppointmentApi = async (data) => {
  const response = await axios.post("/appointments/create", data);
  return response;
};

export const updateAppointmentApi = async (id, data) => {
  const response = await axios.put(`/appointments/update/${id}`, data);
  return response;
};

export const deleteAppointmentApi = async (id) => {
  const response = await axios.delete(`/appointments/delete/${id}`);
  return response;
};
