import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
  // baseURL: 'https://intern-project-be-production.up.railway.app/api',
  // baseURL: 'http://localhost:4000/api',
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
