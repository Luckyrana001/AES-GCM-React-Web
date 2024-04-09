import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tokens } from "../theme";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { FINANCE_DASHBOARD, VALIDATIONS } from '../../src/constants/Constant';
import { Link } from "react-router-dom";

function createData(cycle, status, cutoff, payout, details) {
    return { cycle, status, cutoff, payout, details};
  }
  
  const rows = [
    createData('Bi Weekly : 1st - 15th ', 'Need Approval', '20 Jan ‘24', '22 Jan ‘24', 'RM 1,000,000.00'),
    createData('Weekly : 1st - 7th ', 'Scheduled', '20 Jan ‘24', '22 Jan ‘24', 'RM 100,000.00'),
  ];
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];


const SimpleTable = ({
    statusBG,
    statusData,
    to,
  }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedRow, setSelectedRow] = React.useState({});
    console.log({ selectedRow });


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
                  <TableBody sx={{ background: "rgba(255,255,255,1)"}}>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, textDecoration: 'none !important' }}
                        component={Link} to="/payouts"
                      >
                        <TableCell component="th" scope="row" sx={{ paddingLeft: "28px", fontSize:14, fontWeight: 600 }}>
                          {row.cycle}
                        </TableCell>
                        <TableCell 
                            sx={{ color:statusBG, fontWeight: 700, fontSize:13 }}
                        >
                            <Grid container direction={"row"} alignItems={"center"} spacing={1.5}>
                                <Grid item>
                                    <Box width={6} height={6} borderRadius={6} backgroundColor={statusBG}
                                      sx={{ display: { xs:"none", sm:"flex"} }}
                                    ></Box>
                                </Grid>
                                <Grid item>
                                  {statusData}
                                </Grid>
                            </Grid>
                            
                        </TableCell>
                        <TableCell>{row.cutoff}</TableCell>
                        <TableCell>{row.payout}</TableCell>
                        <TableCell align="right" sx={{ paddingRight: "28px", fontSize:15, fontWeight: 900 }}>{row.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
          </TableContainer>

        </Grid>

);
};

export default SimpleTable;