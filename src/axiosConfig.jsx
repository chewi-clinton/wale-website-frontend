import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("Axios request:", config);
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Axios response:", response);
    return response;
  },
  (error) => {
    console.error("Axios response error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default instance;
