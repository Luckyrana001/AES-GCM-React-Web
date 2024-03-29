// apiService.js
import axios from 'axios';
import { generateBasicAuthHeader } from './BasicAuthHashing';

const instance = axios.create({
  baseURL: 'https://dummyjson.com',
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

export const getUsers = () => {
    return instance.get('/users');
  };
  
export const createUser = (userData) => {
  return instance.post('/users', userData);
};

// Other API service functions...
