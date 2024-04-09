import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import GreetingHeader from "../../components/GreetingHeader";
import SectionHeader from "../../components/SectionHeader";
import SimpleTable from "../../components/SimpleTable";
import HighlightsPrimary from "../../components/HighlightsPrimary";
import HighlightsSecondary from "../../components/HighlightsSecondary";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import * as React from "react";
import Divider from "@mui/material/Divider";

const Payouts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    /* Main Container */
    <Grid
      container
      component="main"
      direction={"column"}
      sx={{
        m: "0 2.5%" /* Approx 30px */,
        borderRadius: "18px",
      }}
    >


      {/* Greetings Header */}

      <GreetingHeader 
        name={"Bi Weekly : 1st - 15th "}>
      </GreetingHeader>

      {/* Greetings Header */}


      {/* Highlights Section */}

      <HighlightsPrimary
        highlightTotal={"1,000,000"}
        highlightPayOut={"RM 900,000"}
        payoutDealers={"24"}
        payoutTransactions={"9,800"}
        onHold={"RM 100,000"}
        onHoldDealers={"1"}
        onHoldTransactions={"200"}
      ></HighlightsPrimary>

      <HighlightsSecondary
        highlightTotal={"660,200"}
        highlightTotal2={"560,000"}
        prepaidAmount={"RM 100,200"}
        prepaidAmount2={"RM 54,200"}
        postpaidAmount={"RM 560,000"}
        postpaidAmount2={"RM 185,600"}
      ></HighlightsSecondary>

      {/* Highlights Section */}


      {/* Payouts Section */}

      <Grid
        item
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
          sectionHeading={"All Transactions"}
        ></SectionHeader>

        <SimpleTable
          statusData={"Needs Approval"}
          statusBG={colors.primary[100]}
        ></SimpleTable>
      </Grid>

      {/* Payouts Section */}

    </Grid>
    /* Main Container */
  );
};

export default Payouts;
