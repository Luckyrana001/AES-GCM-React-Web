import { generateBasicAuthHeader } from "./BasicAuthHashing";
import {  AUTHORIZATION } from "../constants/Constant";
import DebugLog from "../utils/DebugLog";
import { axiosInstance } from "./AxiosIntercepter";


// get Basic auth
export const getBasicAuth = (includeAuthorizationHeader) => {
  let headers = {};
  if (includeAuthorizationHeader) {
    const headerTokken = generateBasicAuthHeader();
    const authToken = "BASIC " + headerTokken;
    //const authToken = "BASIC " + "eW1jYXVzZXI6MnhKeHp3RUdzaDNTNFF2RUMvZWRwZz09"
    DebugLog("authToken====" + authToken);
    headers[AUTHORIZATION] = authToken;
  }
  return axiosInstance.get(process.env.REACT_APP_BASIC_AUTH_API_URL, { headers });
};

// get user login details
export const getUserLoginDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_LOGIN_API_URL, reqestParams);
};

// create dummy user
export const createUser = (reqestParams) => {
  return axiosInstance.post("/users", reqestParams);
};

// get payout details
export const getPayoutDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_PAYOUT_DETAILS_API_URL, reqestParams);
};

// get payout summary 
export const getPayoutSummary = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_PAYOUT_SUMMARY_API_URL, reqestParams);
};

// get on-hold summary 
export const getOnHoldDetails = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_ON_HOLD_DETAILS_API_URL, reqestParams);
};

// get on-hold details 
export const getOnHoldSummary = (reqestParams) => {
  return axiosInstance.post(process.env.REACT_APP_ON_HOLD_SUMMARY_API_URL, reqestParams);
};

