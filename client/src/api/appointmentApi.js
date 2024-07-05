import axios from "./axiosConfig";

export const createNewAppointmentApi = async (data) => {
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

export const getAllAppointmentsApi = async (params) => {
  const response = await axios.get("/appointment/get-all", { params });
  return response;
};

export const getAppointmentDetailApi = async (id) => {
  const response = await axios.get(`/appointment/${id}`);
  return response;
};

export const bookingNewAppointmentApi = async (data) => {
  const response = await axios.post("/appointment/booking", data);
  return response;
};
