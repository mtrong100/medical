import axios from "./axiosConfig";

export const getUserDetailApi = async (id) => {
  const response = await axios.get(`/user/${id}`);
  return response;
};

export const updateUserApi = async (id, data) => {
  const response = await axios.put(`/user/update/${id}`, data);
  return response;
};
