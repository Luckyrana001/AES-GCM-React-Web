import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { initializeEncryption } from './services/AesGcmEncryption';
import { getBasicAuth, getUsers } from './services/ApiService';
import CustomProgressDialog from './components/CustomProgressDialog';
import { Box, Button } from '@mui/material';
import ConnectionStatus from './Utility/ConnectionStatus';
import { SnackbarProvider, useSnackbar } from 'notistack';
import UseOnlineStatus from './Utility/UseOnlineStatus';
import CustomDialog from './Utility/CustomDialog';
import config from './configration/config';

function App() {
  const isOnline = UseOnlineStatus();
  const { enqueueSnackbar } = useSnackbar();
  
  // api variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [basicAuth, setBasicAuth] = useState([]);

 // const { token, login, logout, isAuthenticated } = useAuth();
// const { user, login, logout } = useAuth();

useEffect(() => {

  console.log(config.apiBaseUrl); // This will print the appropriate API URL based on the environment
  if (isOnline) {
    enqueueSnackbar('Internet is not available', { variant: 'error' });
  }

     //generateBasicAuthHeader()
     if(isOnline){
      initializeEncryption()
     } 
   

   

     if(isOnline){
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
    
  }

     

  showNoInternetSnackBar();
  
 }, [isOnline, enqueueSnackbar]);


 const requestBasicAuth = () => {
  if (isOnline) {
    getBasicAuth(true) 
    .then((response) => {
      setBasicAuth(response.data.users);
      console.log("getBasicAuth.data====="+JSON.stringify(response.data))
      //setLoading(false); // Hide the progress dialog
    
    })
    .catch((error) => {
      console.log("error.data====="+error)
      //setError('Error fetching users: '+error);
  
    });
    enqueueSnackbar('You are online');
  }
 }


 const showNoInternetSnackBar = () => {
  if (isOnline) {
    enqueueSnackbar('You are online');
  } else {
    enqueueSnackbar('You are offline', { autoHideDuration: 3000, variant: 'error' });
  }
};


 
  return (
    <Box>
     <SnackbarProvider maxSnack={3}>
      <ConnectionStatus />
    

      {isOnline ? (
      <CustomProgressDialog open={loading} />
      ) : (
        showNoInternetSnackBar()
       )}


<Button variant="contained" color="primary" onClick={showNoInternetSnackBar}>
        Click Me
      </Button>
     
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>


      </SnackbarProvider>
    </Box>
   
  );
};

export default App;
   