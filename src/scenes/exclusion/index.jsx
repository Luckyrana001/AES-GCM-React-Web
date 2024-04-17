import { tokens } from "../../theme";
import * as React from "react";

import { Box, Button, IconButton, Typography,useTheme } from "@mui/material";
import GreetingHeader from "../../components/GreetingHeader";
import SectionHeader from "../../components/SectionHeader";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import ConnectionStatus from "../../utils/ConnectionStatus";
import { SnackbarProvider, useSnackbar } from "notistack";
import UseOnlineStatus from "../../utils/UseOnlineStatus";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  deleteAllKeyFromLocalStorage,
  saveToLocalStorageJsonObject,
} from "../../utils/localStorageUtils";
import CustomProgressDialog from "../../components/CustomProgressDialog";
import ShowErrorAlertDialog from "../../components/ErrorAlertDialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import {
  globalSearchText,
  isAuthPageAtom,
  showErrorAlertDialog,
} from "../../config/AppConfig";
import {
  ALERT,
  AUTHENTICATING_PLEASE_WAIT,
  DONT_HAVE_A_ACCOUNT_SIGNUP,
  ERROR,
  ERROR_WHILE_AUTHENTICATING_USER,
  ERROR_WHILE_FETCHING_PAYOUT_DETAILS,
  ERROR_WHILE_RETRIEVING_BASIC_AUTH,
  FETCHING_PAYOUT_DETAILS_PLEASE_WAIT,
  FETCHING_PAYOUT_SUMMARY_PLEASE_WAIT,
  FORGOT_PASSWORD,
  LOADING_CONFIGRATION_PLEASE_WAIT,
  NO_INTERNET_CONNECTION_FOUND,
  REMEMBER_ME,
  YOU_ARE_OFFLINE,
  YOU_ARE_ONLINE,
} from "../../constants/Strings";
import { initializeEncryption } from "../../services/AesGcmEncryption";
import DebugLog from "../../utils/DebugLog";
import {
  BASIC_AUTH_TOKKEN,
  LOGIN_ID,
  MESSAGE_KEY,
  SESSION_ID,
  USER_ID,
} from "../../constants/LocalStorageKeyValuePairString";
import { generateRequestId } from "../../utils/RequestIdGenerator";
import { ApiType } from "../../services/ApiTags";
import {
  getBasicAuth,
  getPayoutDetails,
  getPayoutSummary,
  getUserLoginDetails,
} from "../../services/ApiService";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


import * as CONSTANT from "../../constants/Constant";
import SimpleTable from "../../components/SimpleTable";
import { payoutSummaryColumnHeader } from "../../components/ColumnHeader";
import NoDataFound from "../../components/NoDataFound";
import CustomButton from "../../components/CustomButton";

const ExclusionScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNetworkConnectionAvailable = UseOnlineStatus();

  const navigate = useNavigate();
  const [, setAuthStatus] = useAtom(isAuthPageAtom);
  const [getDialogStatus, setErrorDialog] = useAtom(showErrorAlertDialog);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(ALERT);
  const [content, setContent] = useState("");
  const [, setError] = useState("");
  const [getProgressbarText, setProgressbarText] = useState("");

  const [payoutSummary, setPayoutSummary] = useState([]);

  const [gridHeight, setGridHeight] = useState(108); // Default height
  const [totalNoOfRows, setTotalNoOfRows] = useState(0); // Default height
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useAtom(globalSearchText);


  const handlePageJump = (event) => {
    setCurrentPage(parseInt(event.target.value, 10) - 1);
  };

  const filteredRows = payoutSummary.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

   // increase - decrease list layout height on available list itmes count
   function getDataGridHeight() {
    // Calculate the total height required for the grid
    const headerHeight = 100; // Height of header row
    const rowHeight = 100; // Height of each data row
    const rowCount = totalNoOfRows; // Total number of data rows
    const totalHeight = headerHeight + rowCount * rowHeight;

    // Set the grid height
    setGridHeight(totalHeight);
  }

  useEffect(() => {

    getDataGridHeight();

    // get Payout details
    //getPayoutDetail();

    getPayoutSummaryData();

    showNoInternetSnackBar();

    navigate(blockNavigation);

  }, [isNetworkConnectionAvailable, enqueueSnackbar,totalNoOfRows]);



  function blockNavigation (location, action)  {
    // Block navigation if action is "pop", which indicates back/forward button press
    if (action === 'pop' ) {
      // Optionally, you can show a message to the user before blocking navigation
       alert('Back button is disabled.');
      return false;
    }
    return true; // Allow navigation for other actions like "push" or "replace"
  };

async function getPayoutSummaryData() {
  try {
    if (isNetworkConnectionAvailable) {
    
        setProgressbarText(FETCHING_PAYOUT_SUMMARY_PLEASE_WAIT);
        setLoading(true); // Hide the progress dialog

        const id = "1";
        const pageNumber = 1;
        const pageSize = 10;

        const payoutDetails = {
          id: id,
          pageNumber: pageNumber,
          pageSize: pageSize,
        };

        initializeEncryption(
          payoutDetails,
          getFromLocalStorage(MESSAGE_KEY),
          ApiType.GET_PAYOUT_SUMMARY
        ).then((encryptedContentData) => {
         
          const payoutSummaryRequestData = {
            requestId: generateRequestId(),
            loginId: getFromLocalStorage(LOGIN_ID),
            sessionId: getFromLocalStorage(SESSION_ID),
            //contentData: encryptedContentData,
          };

        
          getPayoutSummary(payoutSummaryRequestData)
            .then((response) => {
            
              setPayoutSummary(response.data.result.payoutSummaryList)
              setTotalNoOfRows(response.data.result.payoutSummaryList.length);
              setLoading(false);
            })
            .catch((error) => {
              const message =
                error.response != null ? error.response : error.message;
              showErrorAlert(
                error.message,
                ERROR_WHILE_FETCHING_PAYOUT_DETAILS + JSON.stringify(message)
              );
            });
        });
      
    } else {
      showErrorAlert(ALERT, NO_INTERNET_CONNECTION_FOUND);
    }
  } catch (error) {
    const message = error.response != null ? error.response : error.message;
    showErrorAlert(
      error.message,
      ERROR_WHILE_FETCHING_PAYOUT_DETAILS + JSON.stringify(message)
    );
  }
}

async function getPayoutDetail() {
    try {
      if (isNetworkConnectionAvailable) {
      
          setProgressbarText(FETCHING_PAYOUT_DETAILS_PLEASE_WAIT);
          setLoading(true); // Hide the progress dialog

          const id = "1";
          const pageNumber = 1;
          const pageSize = 10;

          const payoutDetails = {
            id: id,
            pageNumber: pageNumber,
            pageSize: pageSize,
          };

          initializeEncryption(
            payoutDetails,
            getFromLocalStorage(MESSAGE_KEY),
            ApiType.GET_PAYOUT_DETAILS
          ).then((encryptedContentData) => {
            const payoutDetailsRequestData = {
              requestId: generateRequestId(),
              loginId: getFromLocalStorage(LOGIN_ID),
              sessionId: getFromLocalStorage(SESSION_ID),
              contentData: encryptedContentData,
            };

          
            getPayoutDetails(payoutDetailsRequestData)
              .then((response) => {
                DebugLog(
                  "getPayoutDetails response.data=====" +
                    JSON.stringify(response.data)
                );

                setLoading(false);
              })
              .catch((error) => {
                const message =
                  error.response != null ? error.response : error.message;
                showErrorAlert(
                  error.message,
                  ERROR_WHILE_FETCHING_PAYOUT_DETAILS + JSON.stringify(message)
                );
              });
          });
        
      } else {
        showErrorAlert(ALERT, NO_INTERNET_CONNECTION_FOUND);
      }
    } catch (error) {
      const message = error.response != null ? error.response : error.message;
      showErrorAlert(
        error.message,
        ERROR_WHILE_FETCHING_PAYOUT_DETAILS + JSON.stringify(message)
      );
    }
  }

  function showErrorAlert(title, content) {
    try {
      DebugLog("error.data=====" + content);
      setError();
      setLoading(false);

      setTitle(title);
      setContent(content);
      setErrorDialog(true);
    } catch (error) {
      DebugLog(error);
    }
  }

  const showNoInternetSnackBar = () => {
    if (isNetworkConnectionAvailable) {
      enqueueSnackbar(YOU_ARE_ONLINE);
    } else {
      enqueueSnackbar(YOU_ARE_OFFLINE, {
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };
  return (
     /* Main Container */
    <Box>
    <SnackbarProvider maxSnack={3}>
    <ConnectionStatus />
    <ShowErrorAlertDialog
      status={getDialogStatus}
      title={title}
      content={content}
    />
    {isNetworkConnectionAvailable ? (
      <CustomProgressDialog open={loading} text={getProgressbarText} />
    ) : (
      showNoInternetSnackBar()
    )}
   
    <Grid
      container
      component="main"
      direction={"column"}
      sx={{
        // height: "100vh",
        m: "0 2.5%" /* Approx 30px */,
        borderRadius: "18px",
      }}
    >
      {/* Greetings Header */}
      <Grid container>
        <Grid item>
          <GreetingHeader name={"Payouts"}></GreetingHeader>
        </Grid>
      </Grid>
      {/* Greetings Header */}

      {/* Validations Section */}
      <Grid
        container
        mt={3}
        border={"1px solid" + colors.grey[600]}
        borderRadius={2}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        pb={2}
      >
        <SectionHeader
          sectionIcon={"../../assets/common/Payouts.svg"}
          sectionHeading={"Payouts"}
        ></SectionHeader>

{payoutSummary.length > 0 ? (
              <Box
                borderRadius={3}
                flex={1}
                m="0px 0 0 0"
                pb={0}
                height={gridHeight}
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.redAccent[200],
                    fontWeight: "bold",
                    fontSize: 13,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(255,255,255,0.6)",
                    borderBottom: "none",
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: `${colors.grey[300]} !important`,
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    background: "rgba(255,255,255,1)",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "rgba(255,255,255,0.6)",
                  },
                  "& .MuiCheckbox-root": {
                    //color: `${colors.white[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    //  color: `${colors.grey[100]} !important`,
                    //backgroundColor: "rgba(255,255,255,0.6)",
                    // opacity:.5
                  },
                }}
              >
                <DataGrid
                  rows={filteredRows.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                  )}
                  columns={payoutSummaryColumnHeader}
                  components={{ Toolbar: GridToolbar }}
                  checkboxSelection
                  selecion
                  pageSize={pageSize}
                  rowCount={filteredRows.length}
                  pagination
                  onPageChange={handlePageChange}
                />
              </Box>
            ) : (
              NoDataFound()
            )}
            

        {/* <SimpleTable
          statusData={"In Validation"}
          statusBG={colors.primary[300]}
          data={payoutSummary}
        ></SimpleTable> */}

      </Grid>
      {/* Validations Section */}

      {payoutSummary.length > 0 ? (
            <Box>
              <Typography>
                <span>Jump to page: </span>
                <select value={currentPage + 1} onChange={handlePageJump}>
                  {[...Array(totalNoOfRows)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </Typography>
            </Box>
          ) : (
            ""
          )}
    </Grid>

      {/* Action Buttons */}

      {payoutSummary.length > 0 ? (
          <Grid item mt={1}  mr={10}   justifyContent={"flex-start"} pb={10}>
            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
              {/* <CustomButton
                btnBG={colors.grey[900]}
                btnColor={colors.grey[100]}
                btnStartIcon={
                  <img src="../../assets/common/Cross.svg" width={22} />
                }
                btnTxt={"Cancel"}
              ></CustomButton>

              <CustomButton
                btnBG={colors.grey[900]}
                btnColor={colors.grey[100]}
                btnStartIcon={
                  <img src="../../assets/common/Tick.svg" width={22} />
                }
                btnTxt={"Release"}
              ></CustomButton> */}

              <CustomButton
                btnBG={colors.grey[900]}
                btnColor={colors.grey[100]}
                btnStartIcon={
                  <img src="../../assets/common/Download.svg" width={22} />
                }
                btnEndIcon={
                  <img src="../../assets/common/Arrow-down.svg" height={8} />
                }
                btnTxt={"Download"}
              ></CustomButton>
            </Stack>
          </Grid>
  ) : (
    ""
  )}
          {/* Action Buttons */}
       
    </SnackbarProvider>
    </Box>
     /* Main Container */
  );
};

export default ExclusionScreen;

