import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { initializeEncryption } from './services/AesGcmEncryption';
import { generateBasicAuthHeader } from './services/BasicAuthHashing';
import { getBasicAuth, getUsers } from './services/ApiService';
import CircularProgress from '@mui/material/CircularProgress';
import CustomProgressDialog from './components/CustomProgressDialog';
import { Box, Button } from '@mui/material';

function App() {
  const [clientInfo, setClientInfo] = useState(null);


  // api variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [basicAuth, setBasicAuth] = useState([]);

 // const { token, login, logout, isAuthenticated } = useAuth();
// const { user, login, logout } = useAuth();

useEffect(() => {

     generateBasicAuthHeader()

     initializeEncryption()

   

    
    getUsers()
      .then((response) => {
        setUsers(response.data.users);
                console.log("response.data====="+response.data.users[0].firstName)
        setLoading(false); // Hide the progress dialog
      
      })
      .catch((error) => {
        console.log("error.data====="+error)
        setError('Error fetching users: '+error);
    
      });



      getBasicAuth(true) 
      .then((response) => {
        setBasicAuth(response.data.users);
        console.log("getBasicAuth.data====="+JSON.stringify(response.data))
        setLoading(false); // Hide the progress dialog
      
      })
      .catch((error) => {
        console.log("error.data====="+error)
        setError('Error fetching users: '+error);
    
      });

     
  
 }, []);


  return (
    <Box>
    
      <CustomProgressDialog open={loading} />
     
      {/* <div>
      {isAuthenticated() ? (
        <p>Authenticated. Token: {token}</p>
      ) : (
        <button onClick={() => login('dummy-token')}>Login</button>
      )}
      <button onClick={logout}>Logout</button>
    </div>
     */}
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
     
    </Box>
   
  );
};

export default App;
   