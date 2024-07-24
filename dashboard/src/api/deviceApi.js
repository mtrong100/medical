import axios from "./axiosConfig";

export const getDevicesApi = async (params) => {
  const response = await axios.get("/device/devices", { params });
  return response;
};

export const getDeviceDetailApi = async (id) => {
  const response = await axios.get(`/device/${id}`);
  return response;
};

export const createDeviceApi = async (data) => {
  const response = await axios.post("/device/create", data);
  return response;
};

export const updateDeviceApi = async (id, data) => {
  const response = await axios.put(`/device/update/${id}`, data);
  return response;
};

export const deleteDeviceApi = async (id) => {
  const response = await axios.delete(`/device/delete/${id}`);
  return response;
};
