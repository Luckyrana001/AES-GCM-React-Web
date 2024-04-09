import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { isAuthPageAtom } from "../../config/AppConfig";
import { useAtom } from 'jotai'
import { useNavigate } from "react-router-dom";
import { LogoDevOutlined, LogoutOutlined } from "@mui/icons-material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";



const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom)
  const navigate = useNavigate();

  function goToDashboard() {
    setAuthStatus(true)
    navigate("/");
  }
  return (
    <div>
       {!isAuthPage ? (
      <Box display="flex" justifyContent="flex-end" p={2} pb={0}>

      <Box display="flex" backgroundColor="#fff" borderRadius={"20px"} justifyContent={"flex-start"} 
        sx={
          {
            position: "absolute",
            left: "20px",
            color: colors.grey[200]
          }
        }
      >
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
      
        <IconButton onClick={() => 
           goToDashboard()}>
          <MenuOutlinedIcon  />
        </IconButton>
     
      </Box>

      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.grey[900]}
        borderRadius="20px"
        mr={1}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      

      {/* ICONS */}
      <Box display="flex" backgroundColor="#fff" borderRadius={"20px"}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>

        
      
        <IconButton onClick={() => 
           goToDashboard()}>
          <LogoutOutlined  />
        </IconButton>

     
      </Box>
    </Box>
      ) : (
        ''
      )}
      </div>
  );
};

export default Topbar;
