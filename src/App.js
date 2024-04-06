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
  const isNetworkConnectionAvailable = UseOnlineStatus();
  const { enqueueSnackbar } = useSnackbar();
  
  // api variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [getUser, setUsers] = useState([]);
  const [basicAuth, setBasicAuth] = useState([]);

 // const { token, login, logout, isAuthenticated } = useAuth();
// const { user, login, logout } = useAuth();

useEffect(() => {


  if (isNetworkConnectionAvailable) {
    enqueueSnackbar('Internet is not available', { variant: 'error' });
  }

     
     if(isNetworkConnectionAvailable){
      initializeEncryption()
     } 
     
     if(isNetworkConnectionAvailable ){
       getUsers()
      .then((response) => {
        setUsers(response.data.users);
       
        console.log("response.data====="+response.data.users[0].firstName)
       // console.log("getUser[0]========"+JSON.stringify(getUser)); 

        setLoading(false); // Hide the progress dialog
      
      })
      .catch((error) => {
        console.log("error.data====="+error)
        setError('Error fetching users: '+error);
    
      });
    
  }
  showNoInternetSnackBar();
  
 }, [isNetworkConnectionAvailable, enqueueSnackbar]);

// Generate Basic Auth hHeader()
 const requestBasicAuth = () => {
  if (isNetworkConnectionAvailable) {
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
  if (isNetworkConnectionAvailable) {
    enqueueSnackbar('You are online');
  } else {
    enqueueSnackbar('You are offline', { autoHideDuration: 3000, variant: 'error' });
  }
};


 
  return (
    <Box>
     <SnackbarProvider maxSnack={3}>
      <ConnectionStatus />
    

      {isNetworkConnectionAvailable ? (
      <CustomProgressDialog open={loading} />
      ) : (
        showNoInternetSnackBar()
       )}


<Button variant="contained" color="primary" onClick={showNoInternetSnackBar}>
        Click Me
      </Button>
     
      <h1>User List</h1>
      <ul>
        {getUser.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>


      </SnackbarProvider>
    </Box>
   
  );
};

export default App;
   