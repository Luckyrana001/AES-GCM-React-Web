import { Box, IconButton, useTheme } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  collapseMenu,
  globalSearchText,
  isAuthPageAtom,
  openSlidingMenu,
} from "../../config/AppConfig";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { LogoDevOutlined, LogoutOutlined } from "@mui/icons-material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { SidebarContext } from "../../scenes/global/context/sidebarContext.jsx";
import DebugLog from "../../utils/DebugLog";
import { iconsImgs } from "../../utils/images/images.js";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom);
  //const [slidingMenuStatus, setSlidingMenu] = useAtom(openSlidingMenu)
  const { state, toggleSidebar } = useContext(SidebarContext);
  const [isCollapsed, setIsCollapsed] = useAtom(collapseMenu);

  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useAtom(globalSearchText);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600); // Adjust the width threshold as needed

      if (isSmallScreen) {
        setIsCollapsed(true);
      } //else{
      //   setIsCollapsed(false)
      // }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial state
    handleResize();

    // Cleanup by removing the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen]); // Empty dependency array ensures that this effect runs only once on component mount

  function goToLoginPage() {
    setAuthStatus(true);
    navigate("/");
  }

  function openSlidingBar() {
    try {
      if (isCollapsed) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
      // toggleSidebar()
    } catch (error) {
      DebugLog(error);
    }
  }

  return (
    <div>
      {!isAuthPage ? (
        <Box display="flex" justifyContent="flex-end" p={2} pb={0}>
          <Box
            display="flex"
            backgroundColor="#fff"
            borderRadius={"20px"}
            justifyContent={"flex-start"}
            sx={{
              position: "absolute",
              left: "20px",
              color: colors.grey[200],
            }}
          >
            {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
            {/* 
<button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
                <img src={ iconsImgs.menu } alt="" />
            </button> */}

            <IconButton onClick={() => openSlidingBar()}>
              <MenuOutlinedIcon />
            </IconButton>
          </Box>

          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.grey[900]}
            borderRadius="20px"
            mr={1}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

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

            <IconButton onClick={() => openSlidingBar()}>
              <NotificationsOutlinedIcon />
            </IconButton>

            <IconButton onClick={() => goToLoginPage()}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default Topbar;
