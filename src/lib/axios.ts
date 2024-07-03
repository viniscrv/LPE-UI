import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (localStorage.getItem("token") && error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );