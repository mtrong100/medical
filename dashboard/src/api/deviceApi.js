import axios from "./axiosConfig";

export const getDevicesCollectionApi = async () => {
  const response = await axios.get("/devices/collection");
  return response;
};

export const getDevicesApi = async (params) => {
  const response = await axios.get("/devices", { params });
  return response;
};

export const getDeviceDetailApi = async (id) => {
  const response = await axios.get(`/devices/${id}`);
  return response;
};

export const getDeviceStatsApi = async () => {
  const response = await axios.get("/devices/stats");
  return response;
};

export const createDeviceApi = async (data) => {
  const response = await axios.post("/devices/create", data);
  return response;
};

export const updateDeviceApi = async (id, data) => {
  const response = await axios.put(`/devices/update/${id}`, data);
  return response;
};

export const deleteDeviceApi = async (id) => {
  const response = await axios.delete(`/devices/delete/${id}`);
  return response;
};
