import axios from "./axiosConfig";

export const getMedicalRecordsFromPatientApi = async (id) => {
  const response = await axios.get(`/patient/medical-records/${id}`);
  return response;
};

export const getAppointmentsFromPatientApi = async (id) => {
  const response = await axios.get(`/patient/appointments/${id}`);
  return response;
};
