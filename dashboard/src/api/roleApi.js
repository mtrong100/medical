import axios from "./axiosConfig";

export const getRolesApi = async () => {
  const response = await axios.get("/role/get-all");
  return response;
};
