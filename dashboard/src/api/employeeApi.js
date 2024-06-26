import axios from "./axiosConfig";

export const createNewEmployeeApi = async (data) => {
  const response = await axios.post("/employee/create", data);
  return response;
};

export const updateEmployeeApi = async (id, data) => {
  const response = await axios.put(`/employee/update/${id}`, data);
  return response;
};

export const deleteEmployeeApi = async (id) => {
  const response = await axios.delete(`/employee/delete/${id}`);
  return response;
};

export const getEmployeeDetaillApi = async (id) => {
  const response = await axios.get(`/employee/${id}`);
  return response;
};

export const terminatedEmployeeApi = async (id, data) => {
  const response = await axios.put(`/employee/terminated/${id}`, data);
  return response;
};

export const lockEmployeeAccountApi = async (id) => {
  const response = await axios.put(`/employee/lock/${id}`);
  return response;
};

export const employeeLoginApi = async (data) => {
  const response = await axios.post("/employee/login", data);
  return response;
};

export const getAllEmployeesApi = async (params) => {
  const response = await axios.get("/employee/get-all", { params });
  return response;
};
