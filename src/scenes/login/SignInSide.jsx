import * as React from "react";
import { tokens } from "../../theme";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, useTheme } from "@mui/material";
import LoginFieldBox from "./components/LoginFieldBox";

export default function SignInSide() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // <ThemeProvider theme={theme}>
    // {/* Main Container - Body */}
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* BG */}
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          backgroundImage: "url(/assets/login/Login-BG-2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
        // spacing={10}
      >
        <Grid
          container
          direction={"row"}
          p={3}
          justifyContent="space-evenly"
          alignItems={"center"}
        >
          <Grid item xs={12} sm={5} md={4} lg={4} xl={6} pb={5} mr={10}>
            <Box display="flex" alignItems="center">
              <img src="assets/common/Logo-White.svg" width={320} />
            </Box>
          </Grid>

          {/* Login Container */}
          <Grid
            item
            xs={12}
            sm={5}
            md={4}
            lg={5}
            xl={6}
            component={Paper}
            elevation={6}
            sx={{
              borderRadius: 2,
              border: "1px solid #E4EBF7",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                py: 6,
                px: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0", fontSize: 24 }}
              >
                Login to Account
              </Typography>
              {/* Form Elements */}
              <LoginFieldBox />

              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
            {/* Header */}
          </Grid>
          {/* Login Container */}
        </Grid>
      </Grid>
      {/* BG */}
    </Grid>
    // {/* Main Container - BG */}
    // </ThemeProvider>
  );
}
