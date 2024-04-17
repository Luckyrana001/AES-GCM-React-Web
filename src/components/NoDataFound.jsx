import { Box, Typography } from "@mui/material";
import { NO_RECORD_FOUND } from "../constants/Strings";
export default function NoDataFound() {
    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        >
        <Typography variant="h6" align="center" mt={1} mb={4}>
          {NO_RECORD_FOUND}
        </Typography>
      
      </Box>
    );
  }

  