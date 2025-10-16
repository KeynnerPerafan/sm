import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request if exists
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access_token");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// Response interceptor to handle 401 -> try refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("token/refresh")
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) {
        isRefreshing = false;
        // logout action could be triggered here
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/token/refresh/", { refresh })
          .then(({ data }) => {
            localStorage.setItem("access_token", data.access);
            api.defaults.headers.Authorization = "Bearer " + data.access;
            originalRequest.headers.Authorization = "Bearer " + data.access;
            processQueue(null, data.access);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            // Si refresh falla, limpiar tokens
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default api;