// src/lib/axios.ts
import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.SERVER_API_URL,
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, // nếu dùng cookie-based auth
});

// Request Interceptor
instance.interceptors.request.use(
  function (config) {
    // // Bạn có thể gắn token thủ công nếu không dùng cookie
    // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
