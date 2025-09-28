import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend.trimaxapharmacy.com", // Added https:// protocol
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authorization header to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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

// Handle token expiration
instance.interceptors.response.use(
  (response) => {
    console.log("Axios response:", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        // Use the same instance for consistency
        const response = await instance.post("/api/token/refresh/", {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("accessToken", access);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, logout user
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
