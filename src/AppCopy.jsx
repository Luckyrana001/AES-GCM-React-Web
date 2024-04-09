import "./App.css";
import { useEffect, useState } from "react";
import { initializeEncryption } from "./services/AesGcmEncryption";
import {
  getBasicAuth,
  getUserLoginDetails,
  getUsers,
} from "./services/ApiService";
import CustomProgressDialog from "./components/CustomProgressDialog";
import { Box, Button } from "@mui/material";
import ConnectionStatus from "./Utility/ConnectionStatus";
import { SnackbarProvider, useSnackbar } from "notistack";
import UseOnlineStatus from "./Utility/UseOnlineStatus";
import { generateRequestId } from "./Utility/RequestIdGenerator";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "./Utility/localStorageUtils";

function App() {
  const isNetworkConnectionAvailable = UseOnlineStatus();
  const { enqueueSnackbar } = useSnackbar();

  // api variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [getUser, setUsers] = useState([]);
  const [getProgressbarText, setProgressbarText] = useState("");

  useEffect(() => {
    // initializeEncryption()
    requestBasicAuth();

    getUserInfo();

    showNoInternetSnackBar();
  }, [isNetworkConnectionAvailable, enqueueSnackbar]);

  const getUserInfo = () => {
    if (isNetworkConnectionAvailable) {
      setProgressbarText("Loading User ...")
      setLoading(true)
      getUsers()
        .then((response) => {
          setUsers(response.data.users);

          console.log("response.data=====" + response.data.users[0].firstName);
          // console.log("getUser[0]========"+JSON.stringify(getUser));

          setLoading(false); // Hide the progress dialog
        })
        .catch((error) => {
          console.log("error.data=====" + error);
          setError("Error fetching users: " + error);
          setLoading(false)
        });
    }
  };

  // Generate Basic Auth hHeader()
  const requestBasicAuth = () => {
    if (isNetworkConnectionAvailable) {
      getBasicAuth(true)
        .then((response) => {
          console.log("getBasicAuth.data=====" + JSON.stringify(response.data));
          saveToLocalStorage("messageKey", response.data.messageKey);
          saveToLocalStorage("basicAuthToken", response.data.basicAuthToken);

        })
        .catch((error) => {
          console.log("error in BasicAuth=====" + error);
          //setError('Error fetching users: '+error);
          
        });
      enqueueSnackbar("You are online");
    }
  };

  const showNoInternetSnackBar = () => {
    if (isNetworkConnectionAvailable) {
      enqueueSnackbar("You are online");
    } else {
      enqueueSnackbar("You are offline", {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };

  const doSignUp = async () => {
    try {
    
      if (isNetworkConnectionAvailable) {
        setProgressbarText("Authenticating, Please wait...")
         setLoading(true) // Hide the progress dialog

        const imeiNumber = "23423423423";
        const isAutoLogin = "N";
        const loginId = "ymcauser";
        const password = "password";

        const signInData = {
          imeiNumber: imeiNumber,
          isAutoLogin: isAutoLogin,
          loginId: loginId,
          password: password,
        };

        initializeEncryption(signInData, getFromLocalStorage("messageKey"))
          .then((encryptedLoginData) => {
            console.log(
              "App js encrypted Login Data=====" + encryptedLoginData
            );
            const signInReqestData = {
              requestId: generateRequestId(),
              loginId: "ymcauser",
              sessionId: "",
              basicAuthToken: getFromLocalStorage("basicAuthToken"),
              contentData: encryptedLoginData,
              userLoginAttemptId: 1,
              password: "password",
              imeiNumber: "23423423423",
              isAutoLogin: "N",
            };

            console.log(
              "SignIn Reqest Data========" + JSON.stringify(signInReqestData)
            );

            getUserLoginDetails(signInReqestData)
              .then((response) => {
                setLoading(false)
                if (!response || !response.ok) {
                  return Promise.reject(new Error("Network error")); // Reject the promise with a custom error message
                }
                return response.text(); // Use response.text() if the response is ok
              })
              .then((data) => {
                // Handle successful response
                console.log("doLogin response.data=====" + data.data);
                setLoading(false)
              })
              .catch((error) => {
                console.error("Login API Error:", error);
                setLoading(false)
              });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false)
          });
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
    }
  };

  return (
    <Box>
      <SnackbarProvider maxSnack={3}>
        <ConnectionStatus />

        {isNetworkConnectionAvailable ? (
          <CustomProgressDialog open={loading} text={getProgressbarText}/>
        ) : (
          showNoInternetSnackBar()
        )}

        <h1>User List</h1>
        <ul>
          {getUser.map((user) => (
            <li key={user.id}>{user.firstName}</li>
          ))}
        </ul>

        <Button variant="contained" color="primary" onClick={doSignUp}>
          Click Me
        </Button>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
