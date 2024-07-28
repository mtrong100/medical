import axios from "./axiosConfig";

export const getUserDetailApi = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response;
};

export const updateUserApi = async (id, data) => {
  const response = await axios.put(`/users/update/${id}`, data);
  return response;
};
