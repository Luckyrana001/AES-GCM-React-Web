import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { initializeEncryption } from './services/AesGcmEncryption';
import { generateBasicAuthHeader } from './services/BasicAuthHashing';
import { getUsers } from './services/ApiService';
import CircularProgress from '@mui/material/CircularProgress';
import CustomProgressDialog from './components/CustomProgressDialog';
import { SnackbarProvider } from 'notistack';
import { Box, Button } from '@mui/material';
import SnackbarComponent, { AdvanceSnackBar, BasicSnackBar } from './components/SnackBar';

function App() {
  const [clientInfo, setClientInfo] = useState(null);


  // api variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);


 
 
useEffect(() => {

     //generateBasicAuthHeader()

    // initializeEncryption()
    
    getUsers()
      .then((response) => {
        setUsers(response.data.users);
        console.log("response.data====="+JSON.stringify(response.data))
        console.log("response.data====="+response.data.users[0].firstName)
        setLoading(false); // Hide the progress dialog
      
      })
      .catch((error) => {
        console.log("error.data====="+error)
        setError('Error fetching users: '+error);
    
      });
  
 }, []);


  return (
    <Box>
       {/* <SnackbarProvider maxSnack={3}> */}
      <CustomProgressDialog open={loading} />
     
     
    
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
      {/* </SnackbarProvider> */}
    </Box>
  );
};

export default App;
   