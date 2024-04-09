import { Button, FormControlLabel, Grid, Link, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import * as React from "react";
import { isAuthPageAtom, showErrorAlertDialog } from "../../../config/AppConfig";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import * as CONSTANT from "../../../constants/Constant";
import { Formik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import { CheckBox } from "@mui/icons-material";
import { initializeEncryption } from "../../../services/AesGcmEncryption";
import {
  getBasicAuth,
  getUserLoginDetails,
  getUsers,
} from "../../../services/ApiService";
import ConnectionStatus from "../../../utils/ConnectionStatus";
import { SnackbarProvider, useSnackbar } from "notistack";
import UseOnlineStatus from "../../../utils/UseOnlineStatus";
import { generateRequestId } from "../../../utils/RequestIdGenerator";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../../utils/localStorageUtils";
import CustomProgressDialog from "../../../components/CustomProgressDialog";
import ShowErrorAlertDialog from "../../../components/ErrorAlertDialog";

// Define a functional component named MyComponent
function LoginFieldBox() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom);
  const [getDialogStatus, setErrorDialog] = useAtom(showErrorAlertDialog);

  

  const isNetworkConnectionAvailable = UseOnlineStatus();
  const { enqueueSnackbar } = useSnackbar();

  // api variables
  const [loading, setLoading] = useState(false);
 // const [getDialogStatus, setErrorDialogOpen] = useState(false);
  const [title, setTitle] = useState("Alert");
  const [content, setContent] = useState("This is error message!");
  const [error, setError] = useState("");
  const [getUser, setUsers] = useState([]);
  const [getProgressbarText, setProgressbarText] = useState("");

  useEffect(() => {
    // initializeEncryption()
    requestBasicAuth();

    getUserInfo();

    showNoInternetSnackBar();
  }, [isNetworkConnectionAvailable, enqueueSnackbar]);

  

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
    } else {
      setErrorDialog(true)
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
        setProgressbarText("Authenticating, Please wait...");
        setLoading(true); // Hide the progress dialog

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
                setLoading(false);
                if (!response || !response.ok) {
                  return Promise.reject(new Error("Network error")); // Reject the promise with a custom error message
                }
                return response.text(); // Use response.text() if the response is ok
              })
              .then((data) => {
                // Handle successful response
                console.log("doLogin response.data=====" + data.data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Login API Error:", error);
                setLoading(false);
              });
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        setErrorDialog(true)
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  const getUserInfo = () => {
    if (isNetworkConnectionAvailable) {
      setProgressbarText("Loading User Info...");
      setLoading(true);
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
          setLoading(false);
        });
    } else {
      setErrorDialog(true)
    }
  };
  const handleFormSubmit = (values) => {
    if (!isNetworkConnectionAvailable) {
      //values.preventDefault();
      console.log(values);
      goToDashboard();
    } else {
      setErrorDialog(true)
    }
  };

  //  login button click listener
  function goToDashboard() {
    setAuthStatus(false);
    navigate(CONSTANT.FINANCE_DASHBOARD);
  }
  return (
    <Box>
      <SnackbarProvider maxSnack={3}>
        <ConnectionStatus />
         <ShowErrorAlertDialog status={getDialogStatus} title={title} content={content} />
        {isNetworkConnectionAvailable ? (
          <CustomProgressDialog open={loading} text={getProgressbarText} />
        ) : (
          showNoInternetSnackBar()
        )}

        <Box sx={{ mt: 1 }}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="emailValue"
                    autoComplete="current"
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.emailValue}
                    error={!!touched.emailValue && !!errors.emailValue}
                    helperText={touched.emailValue && errors.emailValue}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordValue"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passwordValue}
                    error={!!touched.passwordValue && !!errors.passwordValue}
                    helperText={touched.passwordValue && errors.passwordValue}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControlLabel
                    control={<CheckBox value="remember" color="primary" />}
                    label="Remember me"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>

                  {/* Form Elements */}
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </SnackbarProvider>
    </Box>
  );
}

export default LoginFieldBox;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  emailValue: yup.string().required("required"),
  passwordValue: yup.string().required("required"),
  //   email: yup.string().email("invalid email").required("required"),
  //   contact: yup
  //     .string()
  //     .matches(phoneRegExp, "Phone number is not valid")
  //     .required("required"),
  //   address1: yup.string().required("required"),
  //   address2: yup.string().required("required"),
});
const initialValues = {
  //   user: "",
  //   lastName: "",
  emailValue: "pdc_branch",
  passwordValue: "ytlc@xm1234",
  //   address1: "",
  //   address2: "",
};
