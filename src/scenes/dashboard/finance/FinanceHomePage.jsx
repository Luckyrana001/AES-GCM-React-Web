import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import GreetingHeader from "../../../components/GreetingHeader";
import SectionHeader from "../../../components/SectionHeader";
import SimpleTable from "../../../components/SimpleTable";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import HighlightBox from "../../../components/HighlightBox";
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const FinanceHomePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const navigate = useNavigate();

  useEffect(() => {
     navigate(blockNavigation);
  }, [navigate]);

  function blockNavigation (location, action)  {
    // Block navigation if action is "pop", which indicates back/forward button press
    if (action === 'pop' ) {
      // Optionally, you can show a message to the user before blocking navigation
       alert('Back button is disabled.');
      return false;
    }
    return true; // Allow navigation for other actions like "push" or "replace"
  };

  return (
    /* Main Container */
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
          <GreetingHeader greeting={"Welcome Back"} name={"Sung Pik Yeng (Kellie) 👋🏻"}></GreetingHeader>
        </Grid>
      </Grid>
      {/* Greetings Header */}

      {/* Highlights Section */}
      <Grid container direction={"row"} spacing={3}>
        <HighlightBox
          highlightName={"To Approve"}
          highlightCount={"100"}
          highlightBG={colors.primary[100]}
          highlightColor={colors.greenAccent[100]}
          highlightIcon={"../../assets/common/Attention.svg"}
        ></HighlightBox>

        <HighlightBox
          highlightName={"Scheduled"}
          highlightCount={"10"}
          highlightBG={colors.primary[200]}
          highlightColor={colors.greenAccent[100]}
          highlightIcon={"../../assets/common/Scheduled.svg"}
        ></HighlightBox>

        <HighlightBox
          highlightName={"Validations"}
          highlightCount={"12"}
          highlightBG={colors.primary[300]}
          highlightColor={colors.greenAccent[100]}
          highlightIcon={"../../assets/common/Validations.svg"}
        ></HighlightBox>
      </Grid>
      {/* Highlights Section */}

      {/* Payouts Section */}
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
      >
        <SectionHeader
          sectionIcon={"../../assets/common/Payouts.svg"}
          sectionHeading={"Payouts"}
        ></SectionHeader>

        <SimpleTable
          statusData={"Needs Approval"}
          statusBG={colors.primary[100]}
        ></SimpleTable>

      </Grid>
      {/* Payouts Section */}


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
      >
        <SectionHeader
          sectionIcon={"../../assets/common/Validations-black.svg"}
          sectionHeading={"Validation"}
        ></SectionHeader>

        <SimpleTable
          statusData={"In Validation"}
          statusBG={colors.primary[300]}
        ></SimpleTable>

      </Grid>
      {/* Validations Section */}

      {/* On Hold Section */}
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
      >
        <SectionHeader
          sectionIcon={"../../assets/common/OnHold.svg"}
          sectionHeading={"On Hold"}
        ></SectionHeader>

        <SimpleTable
          statusData={"In Validation"}
          statusBG={colors.primary[300]}
        ></SimpleTable>

      </Grid>
      {/* On Hold Section */}

    </Grid>
    /* Main Container */
  );
};

export default FinanceHomePage;
