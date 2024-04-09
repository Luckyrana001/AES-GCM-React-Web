import axios from "axios";
import { generateBasicAuthHeader } from "./BasicAuthHashing";
import config from "./configration/config";

const baseUrl = config.apiBaseUrl;
const dummyApiBaseUrl = config.dummyApiBaseUrl;

const instance = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/'+baseUrl, // proxy server path attached in front
  //baseURL: baseUrl,
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


export const getBasicAuth = (includeAuthorizationHeader) => {
  let headers = {};
  if (includeAuthorizationHeader) {
    const headerTokken = generateBasicAuthHeader()
    //const authToken = "BASIC " + headerTokken
    const authToken = "BASIC " + "eW1jYXVzZXI6MnhKeHp3RUdzaDNTNFF2RUMvZWRwZz09"

     headers["Authorization"] = authToken

     
  }
  return instance.get(process.env.REACT_APP_BASIC_AUTH_API_URL, { headers });
};


export const getUserLoginDetails = (userData) => {
  return instance.post(process.env.REACT_APP_LOGIN_API_URL, userData);
};

export const getUsers = () => {
  return instance2.get(process.env.REACT_APP_USER_API_URL);
};

export const createUser = (userData) => {
  return instance.post("/users", userData);
};
