import axios from "./axiosConfig";

export const getCommentsInPostApi = async (postId) => {
  const response = await axios.get(`/comments/${postId}`);
  return response;
};

export const createCommentApi = async (data) => {
  const response = await axios.post("/comments/create", data);
  return response;
};

export const deleteCommentApi = async (id) => {
  const response = await axios.delete(`/comments/delete/${id}`);
  return response;
};
