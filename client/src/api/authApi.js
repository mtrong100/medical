import axios from "./axiosConfig";

export const loginApi = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response;
};

export const registerApi = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response;
};

export const logoutApi = async () => {
  const response = await axios.post("/auth/logout");
  return response;
};
