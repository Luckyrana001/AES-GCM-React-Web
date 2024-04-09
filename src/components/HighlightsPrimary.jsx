import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

const HighlightsPrimary = ({
  highlightTotal,
  highlightPayOut,
  payoutDealers,
  payoutTransactions,
  onHold,
  onHoldDealers,
  onHoldTransactions
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      xs={12}
      sx={{
        background: colors.grey[900],
        borderRadius: "12px",
        border: "1px solid" + colors.grey[600],
        padding: "20px 30px",
      }}
    >
      <Grid
        container
        xs={12}
        sm={3}
        direction={"column"}
        spacing={1}
        justifyContent={"space-evenly"}
      >
        <Grid
          item
          sx={{
            fontWeight: "600",
            fontSize: "15px",
            textTransform: "uppercase",
          }}
        >
          Total
        </Grid>
        <Grid
          item
          alignItems={"center"}
          sx={{
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          {highlightTotal}
        </Grid>
      </Grid>

      <Divider
        xs={2}
        sm={1}
        orientation="vertical"
        flexItem
        sx={{
          border: "1px solid" + colors.primary[100],
          display: { xs: "none", sm: "block" },
        }}
      />

      <Divider
        xs={12}
        sm={1}
        orientation="horizontal"
        flexItem
        sx={{
          width: "100%",
          margin: "20px 0",
          border: "1px solid" + colors.primary[100],
          display: { xs: "block", sm: "none" },
        }}
      />

      <Grid
        container
        xs={5}
        sm={4}
        direction={"column"}
        justifyContent={"space-between"}
        pl={3}
        sx={{ paddingLeft: { xs: "0", m: "30px" } }}
      >
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid
            item
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "uppercase",
            }}
            pr={2}
          >
            Net PayOut
          </Grid>
          <Grid
            item
            sx={{
              padding: "0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {highlightPayOut}
          </Grid>
        </Grid>

        <Grid container direction={"row"} justifyContent={"space-between"}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              pr={2}
            >
              Dealers
            </Grid>
            <Grid
              item
              sx={{
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {payoutDealers}
            </Grid>
          </Grid>

          <Grid container alignItems={"center"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              pr={2}
            >
              Count
            </Grid>
            <Grid
              item
              sx={{
                padding: "0",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {payoutTransactions}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </Grid> */}

      <Divider
        xs={2}
        sm={1}
        orientation="vertical"
        flexItem
        sx={{ border: "0.5px solid" + colors.primary[100] }}
      />

      <Grid
        container
        xs={5}
        sm={4}
        direction={"column"}
        justifyContent={"space-between"}
        pl={3}
        sx={{ paddingLeft: { xs: "0", m: "30px" } }}
      >
        <Grid container direction={"row"} alignItems={"center"}>
          <Grid
            item
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              textTransform: "uppercase",
            }}
            pr={2}
          >
            On Hold
          </Grid>
          <Grid
            item
            sx={{
              padding: "0",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {onHold}
          </Grid>
        </Grid>

        <Grid container direction={"row"} justifyContent={"space-between"}>
          <Grid container alignItems={"center"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              pr={2}
            >
              Dealers
            </Grid>
            <Grid
              item
              sx={{
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {onHoldDealers}
            </Grid>
          </Grid>

          <Grid container alignItems={"center"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              pr={2}
            >
              Count
            </Grid>
            <Grid
              item
              sx={{
                padding: "0",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              {onHoldTransactions}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HighlightsPrimary;
