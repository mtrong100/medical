import axios from "./axiosConfig";

export const createNewMedicineApi = async (data) => {
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

export const getAllMedicinesApi = async (params) => {
  const response = await axios.get("/medicine/get-all", { params });
  return response;
};
