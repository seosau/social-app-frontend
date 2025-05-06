import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.SERVER_API_URL,
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, 
});

instance.interceptors.request.use(
  function (config) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if(user) {
      config.headers.Authorization = user.id;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
