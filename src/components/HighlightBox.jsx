import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, useTheme } from "@mui/material";

const HighlightBox = ({ highlightName, highlightCount, highlightBG, highlightColor, highlightIcon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid item 
        // height={"17.5vh"}
        xs={6}
        sm={4}
        md={4} 
        lg={4}
        xl={4}
        >
      <Box
        sx={{
          background: colors.grey[900],
          borderRadius: "12px",
          padding: "10px",
          border: "1px solid" + colors.grey[600],
        }}
      >
        <Grid container direction={"row"}>
          <Grid item xs={8.5} sm={8} md={9} lg={9.75}>
            <Grid container direction={"column"}>
              <Grid
                item
                sx={{
                  margin: "20px 0 0 30px",
                  padding: "0",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {highlightName}
              </Grid>

              <Grid
                item
                sx={{
                  margin: "0px 0 0 20px",
                  fontSize: "36px",
                  fontWeight: "800",
                }}
              >
                {highlightCount}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3.5} sm={4} md={3} lg={2.25}>
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              sx={{
                // backgroundColor: {highlightColor},
                height: "100%",
                borderRadius: "8px",
                color: colors.greenAccent[900],
              }}
              backgroundColor={highlightBG}
              color={highlightColor}
            //   mx={"auto"}
            >
            <Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={highlightIcon} width={24} />
              </Box>
            </Box>
              
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default HighlightBox;
