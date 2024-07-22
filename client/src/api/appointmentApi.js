import axios from "./axiosConfig";

export const bookingAppointmentApi = async (data) => {
  const response = await axios.post("/appointment/booking", data);
  return response;
};
