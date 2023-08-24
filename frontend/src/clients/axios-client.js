import axios from "axios";

const axiosClent = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
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
    const response = error.response;
    if (response) {
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
    } else {
      alert("Error occured!");
    }
  }
);

export default axiosClent;
