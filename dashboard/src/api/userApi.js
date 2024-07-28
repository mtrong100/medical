import axios from "./axiosConfig";

export const getUserDetailApi = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response;
};

export const updateUserApi = async (id, data) => {
  const response = await axios.put(`/users/update/${id}`, data);
  return response;
};

export const updateUserAccountApi = async (id, data) => {
  const response = await axios.put(`/users/update-account/${id}`, data);
  return response;
};

export const deleteUserApi = async (id) => {
  const response = await axios.delete(`/users/delete/${id}`);
  return response;
};
