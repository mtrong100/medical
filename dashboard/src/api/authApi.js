import axios from "./axiosConfig";

export const loginApi = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response;
};

export const logoutApi = async () => {
  const response = await axios.post("/auth/logout");
  return response;
};
