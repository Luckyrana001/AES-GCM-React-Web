import { tokens } from "../theme";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box, Button, useTheme } from "@mui/material";


const CustomButton = ({
    btnBG,
    btnColor,
    btnTxt,
    btnStartIcon,
    btnEndIcon
}
) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid
        sx={{
            ".customBtn": {
            backgroundColor: btnBG,
            color: btnColor,
            borderRadius: "24px",
            boxShadow: "0px 12px 24px 0px rgba(0, 0, 0, 0.08)",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1.25px",
            padding: "8px 24px",
            },
            "& .customBtn:hover": {
                backgroundColor: btnBG,
                boxShadow: "0px 12px 24px 0px rgba(0, 0, 0, 0.15)",
            }
        }}
        >
            <Button
            className="customBtn"
            variant="contained"
            startIcon= {btnStartIcon}
            endIcon= {btnEndIcon}
            >
            {btnTxt}
            </Button>
        </Grid>    
    );

};

export default CustomButton;