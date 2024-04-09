import { Typography, Grid, useTheme } from "@mui/material";
import { tokens } from "../theme";

const GreetingHeader = ({ greeting, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (

    <Grid container mb={2} direction={"column"} sx={{ paddingTop: { xs:"32px", sm:"0" }, paddingLeft: { xs:"32px", sm:"0"} }}>
        <Grid item>
            <Typography variant="h6" color={colors.grey[100]}>
                {greeting}
            </Typography>
        </Grid>
        
        <Grid item>
            <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                {name}
            </Typography>
        </Grid>

    </Grid>

  );
};

export default GreetingHeader;
