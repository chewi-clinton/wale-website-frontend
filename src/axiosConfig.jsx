// axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend.trimaxapharmacy.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Only add authorization header if a token exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    // Only add the header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip token refresh if there's no token in localStorage
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // If no refresh token, just continue without authentication
        delete originalRequest.headers.Authorization;
        return instance(originalRequest);
      }

      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "https://backend.trimaxapharmacy.com/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;
        localStorage.setItem("accessToken", access);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, remove tokens and continue without auth
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        delete originalRequest.headers.Authorization;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
