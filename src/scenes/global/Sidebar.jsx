import * as React from "react";
import { useState } from "react";

import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Icon } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
// import { styled } from '@mui/material/styles';
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { isAuthPageAtom } from "../../config/AppConfig";
import { useAtom } from "jotai";
import { BackButtonListener } from "../../components/BackButtonListener";
import { FINANCE_DASHBOARD } from "../../constants/Constant";

/* NEW ICONS */

// import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
        // fontFamily: 'Montserrat Bold',
        // fontWeight: "900"
        
      }}
      onClick={
        () => setSelected(title)
      }
      icon={icon}
    >
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: "500",
        }}
      
      >{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [selected, setSelected] = useState("Dashboard");
  const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom);

  return (
    <div>
      {!isAuthPage ? (
        <Box
          alignItems={"space-around"}
          visibility={isVisible}
          sx={{
            "& .pro-sidebar-inner": {
              background: `${colors.white[50]} !important`,
              fontFamily: "Montserrat-Bold",
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover, ": {
              color: colors.redAccent[200] + "!important",
              // fontFamily: "Montserrat-Bold",
            },
            "& .pro-menu-item.active": {
              color: colors.redAccent[200] + "!important",
              fontFamily: "Montserrat-Bold",
              fontWeight: "900 !important",
            },
            display: { xs: "none", sm: "block"},
            height: "120vh",
            // position: "fixed",
            zIndex: "1000",
            // width: "270px",
          }}
        >
          {/* <BackButtonListener></BackButtonListener> */}
          

          <ProSidebar collapsed={isCollapsed} sx={{height:"100vh"}}>
            <Menu iconShape="square">
              {/* LOGO AND MENU ICON */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  // color: colors.primary[200],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    {/* <Typography variant="h3" color={colors.grey[200]}>
                  ADMINIS
                </Typography> */}
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src="../../assets/common/Logo.svg" />
                    {/* <img src="../../assets/common/Attention.svg"/> */}
                  </Box>
                </Box>
              )}

              <Box pt={2} paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Dashboard"
                  to={FINANCE_DASHBOARD}
                  icon={<OtherHousesOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                  sx={{ fontWeight: "700", m: 1 }}
                />

                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Incentive
                </Typography> */}
                <Item
                  title="Validations"
                  to="/validations"
                  icon={<GppMaybeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Payout"
                  to="/payoutsArchive"
                  icon={<CurrencyExchangeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="On-Hold"
                  to="/onhold"
                  icon={<PauseOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Exclusions"
                  to="/form"
                  icon={<DoNotDisturbAltOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="Formulas"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <Item
                  title="Payout Dates"
                  to="/form"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Witholding Tax"
                  to="/faq"
                  icon={<PersonRemoveOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Reports
                </Typography> */}

                <Item
                  title="Reports"
                  to="/team"
                  icon={<ArticleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Adjustments"
                  to="/team"
                  icon={<CalculateOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Earmark"
                  to="/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Freeze Accounts"
                  to="/invoices"
                  icon={<AcUnitOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                {/* <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Pages
                </Typography> */}
                <Item
                  title="Credit Debit"
                  to="/form"
                  icon={<PercentOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="Calendar"
                  to="/calendar"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="FAQ Page"
                  to="/faq"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />

                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Charts
                </Typography>
                <Item
                  title="Bar Chart"
                  to="/bar"
                  icon={<BarChartOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Pie Chart"
                  to="/pie"
                  icon={<PieChartOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Line Chart"
                  to="/line"
                  icon={<TimelineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Geography Chart"
                  to="/geography"
                  icon={<MapOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
              </Box>
            </Menu>
          </ProSidebar>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
