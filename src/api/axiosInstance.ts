import axios from "axios";
import { logoutUser } from "../context/userSlice";
import { store } from "../context/store";
import { redirectToDashboard } from "../utils/redirect";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    const isRefreshEndpoint = originalRequest.url.includes('/auth/local/refreshTokens');
    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post(`${import.meta.env.VITE_BACKEND_URL}/auth/local/refreshTokens`, {}, {withCredentials: true});
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        store.dispatch(logoutUser());
        redirectToDashboard();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
