import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";

const HighlightStats = ({
  highlightTotal,
  highlight1,
  highlight1Stat,
  highlight2,
  highlight2Stat,
  highlight3,
  highlight3Stat,

}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
      container
      direction={"row"}
      justifyContent={"space-around"}
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
        sm={2.5}
        direction={"column"}
        spacing={1}
        justifyContent={"space-between"}
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
        sm={0.5}
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
        xs={12}
        sm={9}
        direction={"row"}
        spacing={1}
        justifyContent={"space-around"}
      >
        <Grid container direction={"column"} justifyContent={"space-evenly"}>
            <Grid
            item
            sx={{
                fontWeight: "500",
                color: colors.grey[300],
                fontSize: "15px",
                textTransform: "uppercase",
            }}
            >
            {highlight1}
            </Grid>
            <Grid
            item
            alignItems={"center"}
            sx={{
                fontSize: "26px",
                fontWeight: "600",
            }}
            >
            {highlight1Stat}
            </Grid>
        </Grid>
        <Grid container direction={"column"} justifyContent={"space-evenly"}>
            <Grid
            item
            sx={{
                fontWeight: "500",
                color: colors.grey[300],
                fontSize: "15px",
                textTransform: "uppercase",
            }}
            >
            {highlight2}
            </Grid>
            <Grid
            item
            alignItems={"center"}
            sx={{
                fontSize: "26px",
                fontWeight: "600",
            }}
            >
            {highlight2Stat}
            </Grid>
        </Grid>
        <Grid container direction={"column"} justifyContent={"space-evenly"}>
            <Grid
            item
            sx={{
                fontWeight: "500",
                color: colors.grey[300],
                fontSize: "15px",
                textTransform: "uppercase",
            }}
            >
            {highlight3}
            </Grid>
            <Grid
            item
            alignItems={"center"}
            sx={{
                fontSize: "26px",
                fontWeight: "600",
            }}
            >
            {highlight3Stat}
            </Grid>
        </Grid>
        
      </Grid>


      </Grid>
  );
};

export default HighlightStats;
