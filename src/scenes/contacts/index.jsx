import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { AlignVerticalCenter } from "@mui/icons-material";
import SectionHeader from "../../components/SectionHeader";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: .5 , headerAlign: 'left', cellClassName: 'super-app-theme--cell'},
    { field: "registrarId", headerName: "REGISTER ID",flex: 1 , headerAlign: 'left',  AlignVerticalCenter: true, },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: 'left',
    },
    {
      field: "age",
      flex: .5,
      headerName: "AGE",
      type: "number",
      headerAlign: "left",
      align: "left",
      headerAlign: 'left',
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: "address",
      headerName: "ADDRESS",
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: "city",
      headerName: "CITY",
      flex: 1,
      headerAlign: 'left',
    },
    {
      field: "zipCode",
      headerName: "ZIPCODE",
      flex: 1,
      headerAlign: 'left',
    },
  ];

  return (
    <Box m="50px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />

      <SectionHeader
          sectionIcon={"../../assets/common/Payouts.svg"}
          sectionHeading={"Payouts"}
        ></SectionHeader>
      <Box
        m="0px 0 0 0"
        pb={20}
        height="120vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.redAccent[200], fontWeight: 'bold', fontSize:13
           
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor:"rgba(255,255,255,0.6)",
            borderBottom: "none",
            fontWeight: 'bold',
            fontSize: '13px',
            color: `${colors.grey[300]} !important`,
          },
          "& .MuiDataGrid-virtualScroller": {
            background: "rgba(255,255,255,1)"
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "rgba(255,255,255,0.6)",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.white[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          //  color: `${colors.grey[100]} !important`,
          //backgroundColor: "rgba(255,255,255,0.6)",
         // opacity:.5
        
          },
        }}
      >
        
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
