import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

// Custom header component
export const PayoutHeader = () => {
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} borderRadius= {2}>
         <TableContainer sx={{ borderRadius: "0 0 8px 8px"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead sx={{ background: "rgba(255,255,255,0.6)", color:"#FF2300 !important", textTransform: "uppercase" }}>
                    <TableRow sx={{letterSpacing: "1px"  }}>
                      <TableCell sx={{ paddingLeft: "28px" }} >Cycle</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Cut Off</TableCell>
                      <TableCell>Pay Out By</TableCell>
                      <TableCell align="right" sx={{ paddingRight: "28px" }}>Details</TableCell>
                    </TableRow>
                  </TableHead>
     
       </Table>
          </TableContainer>
      </Grid>
    );
  };
