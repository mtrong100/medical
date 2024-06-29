import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  // timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.log("Error response:", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.log("No response from server:", error.request);
      return Promise.reject("No response from server");
    } else {
      console.log("Error:", error.message);
      return Promise.reject(error.message);
    }
  }
);

export default instance;
