import axios from "./axiosConfig";

export const createNewMedicineCategoryApi = async (data) => {
  const response = await axios.post("/medicine-category/create", data);
  return response;
};

export const updateMedicineCategoryApi = async (id, data) => {
  const response = await axios.put(`/medicine-category/update/${id}`, data);
  return response;
};

export const deleteMedicineCategoryApi = async (id) => {
  const response = await axios.delete(`/medicine-category/delete/${id}`);
  return response;
};

export const getAllMedicineCategoriesApi = async (params) => {
  const response = await axios.get("/medicine-category/get-all", { params });
  return response;
};
