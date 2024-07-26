import axios from "./axiosConfig";

export const loginApi = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response;
};

export const registerApi = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response;
};

export const googleLoginApi = async (data) => {
  const response = await axios.post("/auth/google-login", data);
  return response;
};

export const logoutApi = async () => {
  const response = await axios.post("/auth/logout");
  return response;
};

export const sendOtpApi = async (data) => {
  const response = await axios.post("/auth/send-otp", data);
  return response;
};

export const resetPasswordApi = async (data) => {
  const response = await axios.post("/auth/reset-password", data);
  return response;
};
