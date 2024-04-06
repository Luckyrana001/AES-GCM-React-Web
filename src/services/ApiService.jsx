import axios from "axios";
import { generateBasicAuthHeader } from "./BasicAuthHashing";
import config from "../configration/config";

const baseUrl = config.apiBaseUrl;
const dummyApiBaseUrl = config.dummyApiBaseUrl;

const instance = axios.create({
  //baseURL: 'https://cors-anywhere.herokuapp.com/'+baseUrl, // proxy server path attached in front
  baseURL: baseUrl,
  timeout: 20000, 
  headers: {
    "Content-Type": "application/json", 
  },
});

const instance2 = axios.create({
  baseURL: dummyApiBaseUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json", 
  },
});


export const getBasicAuth = () => {
  let headers = {};
  // Conditionally include authorization header
  if (includeAuthorizationHeader) {
    const headerTokken = generateBasicAuthHeader();
    // Set your authorization token here
    const authToken = "BASIC " + headerTokken;
    headers["Authorization"] = authToken;
    //headers['Authorization'] = 'BASIC eW1jYXVzZXI6MnhKeHp3RUdzaDNTNFF2RUMvZWRwZz09';
  }
  return instance.get(process.env.REACT_APP_BASIC_AUTH_API_URL, { headers });
};

export const getUsers = () => {
  return instance2.get(process.env.REACT_APP_USER_API_URL);
};

export const createUser = (userData) => {
  return instance.post("/users", userData);
};
