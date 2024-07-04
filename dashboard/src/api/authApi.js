import axios from "./axiosConfig";

export const loginApi = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response;
};
