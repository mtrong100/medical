import axios from "./axiosConfig";

export const getUsersApi = async (params) => {
  const response = await axios.get("/user/users", { params });
  return response;
};

export const createUserApi = async (data) => {
  const response = await axios.post("/user/create", data);
  return response;
};

export const updateUserApi = async (id, data) => {
  const response = await axios.put(`/user/update/${id}`, data);
  return response;
};

export const deleteUserApi = async (id) => {
  const response = await axios.delete(`/user/delete/${id}`);
  return response;
};

export const getUserDetailApi = async (id) => {
  const response = await axios.get(`/user/${id}`);
  return response;
};
