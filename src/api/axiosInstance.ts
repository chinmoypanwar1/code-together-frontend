import axios from "axios";
import { logoutUser } from "../context/userslice";
import { store } from "../context/store";
import { redirectToLogin } from "../utils/redirect";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/local/refreshTokens`, {}, {withCredentials: true});
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        store.dispatch(logoutUser());
        redirectToLogin();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
