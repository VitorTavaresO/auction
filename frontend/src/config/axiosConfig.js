import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("chegou aqui");
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      console.log(user.token);
      config.headers.Authorization = `Bearer ${user.token}`;
      console.log(config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
