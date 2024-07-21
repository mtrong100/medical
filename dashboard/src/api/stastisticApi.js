import axios from "./axiosConfig";

export const getRevenueApi = async () => {
  const response = await axios.get("/statistic/revenue");
  return response;
};

export const getFiguresApi = async () => {
  const response = await axios.get("/statistic/figures");
  return response;
};

export const getMonthlyRevenueApi = async () => {
  const response = await axios.get("/statistic/monthly-revenue");
  return response;
};
