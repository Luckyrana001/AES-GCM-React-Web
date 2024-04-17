import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const SectionHeader = ({
  sectionHeading,
  sectionIcon,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Grid
          item
          xs={12} sm={12} md={12} lg={12} xl={12} pb={10}
          backgroundColor={"rgba(255,255,255,0.6)"}
          opacity={5}
          borderRadius= {2}
          p={3}
          alignItems={"center"}
        >
          <Grid container direction={"row"} alignItems={"center"} spacing={3}>
            <Grid item>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img src={sectionIcon} width={24} />
              </Box>
            </Grid>
            <Grid
              item
              fontSize={20}
              fontWeight={700}
            >
              {sectionHeading}
              </Grid>
          </Grid>

        </Grid>
  );
};

export default SectionHeader;
