import axios from "./axiosConfig";

export const getEmployeesApi = async (params) => {
  const response = await axios.get("/employees", { params });
  return response;
};

export const getEmployeeDetaillApi = async (id) => {
  const response = await axios.get(`/employees/${id}`);
  return response;
};

export const getEmployeeStatsApi = async () => {
  const response = await axios.get("/employees/stats");
  return response;
};

export const createEmployeeApi = async (data) => {
  const response = await axios.post("/employees/create", data);
  return response;
};

export const updateEmployeeApi = async (id, data) => {
  const response = await axios.put(`/employees/update/${id}`, data);
  return response;
};

export const deleteEmployeeApi = async (id) => {
  const response = await axios.delete(`/employees/delete/${id}`);
  return response;
};

export const terminatedEmployeeApi = async (id, data) => {
  const response = await axios.put(`/employees/terminated/${id}`, data);
  return response;
};
