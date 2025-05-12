import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.SERVER_API_URL,
  baseURL: 'http://localhost:3001/api',
  withCredentials: true, 
});

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
