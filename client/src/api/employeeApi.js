import axios from "./axiosConfig";

export const getEmployeesApi = async (params) => {
  const response = await axios.get("/employees", { params });
  return response;
};
