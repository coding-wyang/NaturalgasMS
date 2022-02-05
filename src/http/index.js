import axios from 'axios';

/**
 * http请求
 */
const http = axios.create({
  baseURL: 'http://192.168.0.105:5000',
  timeout: 5000,
});
http.interceptors.request.use(
  (config) => {
    if (config.method.toUpperCase() === 'GET') {
      config.params = config.data;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export default http;
