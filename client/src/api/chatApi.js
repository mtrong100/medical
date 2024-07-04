import axios from "./axiosConfig";

export const sendMessageApi = async (id, data) => {
  const response = await axios.post(`/message/send/${id}`, data);
  return response;
};

export const getMessagesApi = async (id) => {
  const response = await axios.get(`/message/${id}`);
  return response;
};
