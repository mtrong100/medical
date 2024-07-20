import axios from "./axiosConfig";

export const getMedicinesApi = async (params) => {
  const response = await axios.get("/medicine/medicines", { params });
  return response;
};

export const getMedicineCollectionApi = async () => {
  const response = await axios.get("/medicine/collection");
  return response;
};

export const getMedicineDetail = async (id) => {
  const response = await axios.get(`/medicine/${id}`);
  return response;
};

export const createMedicineApi = async (data) => {
  const response = await axios.post("/medicine/create", data);
  return response;
};

export const updateMedicineApi = async (id, data) => {
  const response = await axios.put(`/medicine/update/${id}`, data);
  return response;
};

export const deleteMedicineApi = async (id) => {
  const response = await axios.delete(`/medicine/delete/${id}`);
  return response;
};
