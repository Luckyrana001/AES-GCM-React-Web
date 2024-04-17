import axios from 'axios';
import config from "./configration/config";
import { APPLICATION_JSON } from "../constants/Constant";

const baseUrl = config.apiBaseUrl;



export const axiosInstance = axios.create({
  //baseURL: "https://cors-anywhere.herokuapp.com/" + baseUrl, // proxy server path attached TO BYPASS CORS
  baseURL: baseUrl,  // IF API DO NOT HAVE CORS ISSUE
  timeout: 20000,
  headers: {
    "Content-Type": APPLICATION_JSON,
  },
});


// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('Request sent:', config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log('Response received:', response);
    return response;
  },
  function (error) {
    // Do something with response error
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);



// Remove the interceptors when no longer needed (e.g., when component unmounts)
//instance.interceptors.request.eject(requestInterceptor);
//instance.interceptors.response.eject(responseInterceptor);
