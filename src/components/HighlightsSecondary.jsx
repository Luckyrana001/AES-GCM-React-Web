import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

const HighlightsPrimary = ({
  highlightTotal,
  highlightTotal2,
  prepaidAmount,
  postpaidAmount,
  prepaidAmount2,
  postpaidAmount2,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid container>

      <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      xs={6}
      mt={1}
      sx={{
        background: colors.grey[900],
        borderRadius: "12px 0 0 12px",
        border: "1px solid" + colors.grey[600],
        padding: "10px 30px",
      }}
      >
      <Grid
        container
        xs={12}
        sm={6}
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
          Dealers
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


      <Grid
        container
        xs={12}
        sm={6}
        direction={"row"}
        justifyContent={"flex-end"}
        pl={3}
        sx={{ paddingLeft: { xs: "0", m: "30px" } }}
      >

        <Grid container direction={"column"} justifyContent={"space-around"}>
          <Grid container alignItems={"center"} justifyContent={"flex-end"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              
            >
              Prepaid
            </Grid>
            <Grid
              item
              sx={{
                fontSize: "15px",
                fontWeight: "600",
              }}
              pl={2}
            >
              {prepaidAmount}
            </Grid>
          </Grid>

          <Grid container alignItems={"center"} justifyContent={"flex-end"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Postpaid
            </Grid>
            <Grid
              item
              sx={{

                fontSize: "15px",
                fontWeight: "600",
              }}
              pl={2}
            >
              {postpaidAmount}
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      

    </Grid>


    <Grid
      container
      direction={"row"}
      justifyContent={"space-between"}
      xs={6}
      mt={1}
      sx={{
        background: colors.grey[900],
        borderRadius: "0 12px 12px 0",
        border: "1px solid" + colors.grey[600],
        padding: "10px 30px",
      }}
    >
      <Grid
        container
        xs={12}
        sm={6}
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
          Master Dealers
        </Grid>
        <Grid
          item
          alignItems={"center"}
          sx={{
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          {highlightTotal2}
        </Grid>
      </Grid>


      <Grid
        container
        xs={12}
        sm={6}
        direction={"row"}
        justifyContent={"flex-end"}
        pl={3}
        sx={{ paddingLeft: { xs: "0", m: "30px" } }}
      >

        <Grid container direction={"column"} justifyContent={"space-around"}>
          <Grid container alignItems={"center"} justifyContent={"flex-end"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
              
            >
              Prepaid
            </Grid>
            <Grid
              item
              sx={{
                fontSize: "15px",
                fontWeight: "600",
              }}
              pl={2}
            >
              {prepaidAmount2}
            </Grid>
          </Grid>

          <Grid container alignItems={"center"} justifyContent={"flex-end"}>
            <Grid
              item
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Postpaid
            </Grid>
            <Grid
              item
              sx={{

                fontSize: "15px",
                fontWeight: "600",
              }}
              pl={2}
            >
              {postpaidAmount2}
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      

    </Grid>


    </Grid>
    
    





    
  );
};

export default HighlightsPrimary;
