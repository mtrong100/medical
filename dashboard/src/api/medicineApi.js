import axios from "./axiosConfig";

export const getMedicineCollectionApi = async () => {
  const response = await axios.get("/medicines/collection");
  return response;
};

export const getMedicinesApi = async (params) => {
  const response = await axios.get("/medicines", { params });
  return response;
};

export const getMedicineDetail = async (id) => {
  const response = await axios.get(`/medicines/${id}`);
  return response;
};

export const createMedicineApi = async (data) => {
  const response = await axios.post("/medicines/create", data);
  return response;
};

export const updateMedicineApi = async (id, data) => {
  const response = await axios.put(`/medicines/update/${id}`, data);
  return response;
};

export const deleteMedicineApi = async (id) => {
  const response = await axios.delete(`/medicines/delete/${id}`);
  return response;
};
