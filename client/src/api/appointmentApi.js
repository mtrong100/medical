import axios from "./axiosConfig";

export const bookingAppointmentApi = async (data) => {
  const response = await axios.post("/appointments/booking", data);
  return response;
};
