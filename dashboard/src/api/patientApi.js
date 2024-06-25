import axios from "axios";

const patientApi = axios.create({
  baseURL: "http://localhost:5000/api/patient",
  headers: {
    "Content-type": "application/json",
  },
});

export default patientApi;

const getPatient = async (id) => {
  const { data } = await patientApi.get(`/get-patient/${id}`);
  return data;
};
  