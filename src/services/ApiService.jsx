// apiService.js
import axios from 'axios';
import { generateBasicAuthHeader } from './BasicAuthHashing';
const baseUrl = process.env.REACT_APP_YES_SHOP_ADMIN_BASE_URL;
const dummyApiBaseUrl = process.env.REACT_APP_YES_SHOP_ADMIN_DUMMY_API_BASE_URL;

const instance = axios.create({

  baseURL: 'https://cors-anywhere.herokuapp.com/'+baseUrl,
  //baseURL: baseUrl,
  // other default configurations
  timeout: 60000, // Request timeout in milliseconds (60 seconds)
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
   // 'Authorization': 'Authorization' +generateBasicAuthHeader, // Default authorization header
  },
});

const instance2 = axios.create({

  baseURL: dummyApiBaseUrl,
  // other default configurations
  timeout: 60000, // Request timeout in milliseconds (60 seconds)
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
   // 'Authorization': 'Authorization' +generateBasicAuthHeader, // Default authorization header
  },
});



// export const getUsers = async () => {
//   try {
//         const response = await instance.get('/users');
//         console.log('Response:', response.data);
//         return  response.data;
//     } catch (error) {
//         console.error('Error:', error);
//         return  '';
//     }
// };


export const getBasicAuth = () => {
// Define headers object
let headers = {};

// Conditionally include authorization header
// if (includeAuthorizationHeader) {

  const headerTokken = generateBasicAuthHeader();
  // Set your authorization token here
  const authToken = 'BASIC '+headerTokken;
  headers['Authorization'] = authToken;
  //headers['Authorization'] = 'BASIC eW1jYXVzZXI6MnhKeHp3RUdzaDNTNFF2RUMvZWRwZz09';

  
//}

return instance.get('/auth/BasicAuth/88888888/88888888',{headers});
};

export const getUsers = () => {
    return instance2.get('/users');
  };
  
export const createUser = (userData) => {
  return instance.post('/users', userData);
};

// Other API service functions...
