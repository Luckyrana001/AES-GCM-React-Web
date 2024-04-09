import "./App.css";
import { Box} from "@mui/material";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import * as yup from "yup";

// import Dashboard from "./scenes/dashboard";
import Validations from "./scenes/validations";
import PayoutsArchive from "./scenes/payoutsArchive";
import Payouts from "./scenes/payouts";
import OnHold from "./scenes/onhold";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import FAQ from "./scenes/faq";
import Form from "./scenes/form";
// import Bar from "./scenes/bar";
// 
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// 
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider, colors } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
//import Calendar from "./scenes/calendar/calendar";
import SignInSide from "./scenes/login/SignInSide";
import * as CONSTANT from "./constants/Constant";
import FinanceHomePage from "./scenes/dashboard/finance/FinanceHomePage";

import { SnackbarProvider, useSnackbar } from "notistack";
import ConnectionStatus from "./utils/ConnectionStatus";
import UseOnlineStatus from "./utils/UseOnlineStatus";
import CustomProgressDialog from "./components/CustomProgressDialog";

 function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);  



  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       

        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path={CONSTANT.LOGIN} element={<SignInSide />} />
            <Route path={CONSTANT.FINANCE_DASHBOARD} element={<FinanceHomePage />} />
            {/* <Route path={CONSTANT.DELAER_DASHBOARD_ROUTE} element={<Dashboard />} /> */}

              <Route path={CONSTANT.VALIDATION_ROUTE} element={<Validations />} />
              <Route path={CONSTANT.PAYOUT_ARCHIEVE_ROUTE} element={<PayoutsArchive />} />
              <Route path={CONSTANT.PAYOUT_ROUTE} element={<Payouts />} />
              <Route path={CONSTANT.ON_HOLD_ROUTE} element={<OnHold />} />
              <Route path={CONSTANT.CONTACT_ROUTE} element={<Contacts />} />
              <Route path={CONSTANT.INVOICES_ROUTE} element={<Invoices />} />
              <Route path={CONSTANT.FORMS_ROUTE} element={<Form />} />
              {/* 
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} /> */}
              <Route path="/faq" element={<FAQ />} />
              {/* <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
       
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}



export default App;
 