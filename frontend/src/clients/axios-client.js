import axios from "axios";

const axiosClent = axios.create({
  baseURL: `${import.meta.VITE_API_BASE_URL}/api`,
});

axiosClent.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClent.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    switch (response.status) {
      case 401:
        localStorage.removeItem("ACCESS_TOKEN");
        break;

      case 422:
        throw error;

      default:
        alert("Error occured!");
        break;
    }
  }
);

export default axiosClent;
