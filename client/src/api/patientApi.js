import axios from "./axiosConfig";

export const getMedicalRecordsFromPatientApi = async (id) => {
  const response = await axios.get(`/patients/medical-records/${id}`);
  return response;
};

export const getAppointmentsFromPatientApi = async (id) => {
  const response = await axios.get(`/patients/appointments/${id}`);
  return response;
};
