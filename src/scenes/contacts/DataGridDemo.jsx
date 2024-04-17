import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { PayoutHeader } from "../../components/PayoutHeader";
import { Box, Button, IconButton, Typography,useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import GreetingHeader from "../../components/GreetingHeader";
import { tokens } from "../../theme";
import * as React from "react";
import SectionHeader from "../../components/SectionHeader";
const columns = [
  { field: 'id', headerName: 'ID', flex: 1  },
  { field: 'firstName', headerName: 'First name', flex: 1 },
  { field: 'lastName', headerName: 'Last name', flex: 1  },
  { field: 'age', headerName: 'Age', type: 'number', flex: 1 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 16, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
// Custom header component
const CustomHeader = () => {
  return (
    <div>
      <h2>This is a Custom Header</h2>
    </div>
  );
};

const DataGridDemo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
  
   
    <Grid
      container
      component="main"
      direction={"column"}
      sx={{
        // height: "100vh",
        m: "0 2.5%" /* Approx 30px */,
        borderRadius: "18px",
      }}
    >
      {/* Greetings Header */}
      <Grid container>
        <Grid item>
          <GreetingHeader name={"Payouts"}></GreetingHeader>
        </Grid>
      </Grid>
      {/* Greetings Header */}

      {/* Validations Section */}
      <Grid
        container
        mt={3}
        border={"1px solid" + colors.grey[600]}
        borderRadius={2}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        pb={12}
      >
        <SectionHeader
          sectionIcon={"../../assets/common/Payouts.svg"}
          sectionHeading={"Payouts"}
        ></SectionHeader>

      <PayoutHeader></PayoutHeader>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection  
      autoHeight
      
      components={
        
        {
          Toolbar: GridToolbar ,
        header: CustomHeader // Use CustomHeader component as the header
      }}/>
      </div>
      </Grid>
      {/* Validations Section */}
      
      
      {/* // background: "rgba(255,255,255,0.6)", color:"#FF2300 !important", textTransform: "uppercase" */}

    </Grid>
   

    </Box>
     /* Main Container */
  );
};

// components={{ Toolbar: GridToolbar }} 
export default DataGridDemo;
