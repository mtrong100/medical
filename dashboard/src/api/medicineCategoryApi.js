import axios from "./axiosConfig";

export const getMedicineCategoryCollectionApi = async () => {
  const response = await axios.get("/medicine-category/collection");
  return response;
};

export const getMedicineCategoriesApi = async (params) => {
  const response = await axios.get("/medicine-category/medicine-categories", {
    params,
  });
  return response;
};

export const createMedicineCategoryApi = async (data) => {
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
