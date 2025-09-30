// axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend.trimaxapharmacy.com",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (config.url === "/api/orders/" && config.method === "post") {
      console.log("Skipping auth header for order creation");
      return config;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (
        originalRequest.url === "/api/orders/" &&
        originalRequest.method === "post"
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await instance.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("accessToken", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return instance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin";
        return Promise.reject(refreshError);
      }
    }

    console.error("Axios response error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default instance;
