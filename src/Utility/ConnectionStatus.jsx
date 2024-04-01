// ConnectionStatus.js
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "./ConnectionStatus.css"; // Import your CSS file for styling

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      enqueueSnackbar("You are online", {  autoHideDuration: 3000,variant: "success" });
    };

    const handleOffline = () => {
      setIsOnline(false);
      enqueueSnackbar("You are offline", { autoHideDuration: 3000, variant: "error" });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline ? (
        <div className={`connection-status ${isOnline ? "online" : "offline"}`}>
         <p className="connection-paragraph">{isOnline ? "ONLINE" : "No Internet Connection"}</p> 
        </div>
      ) : (
        <div></div>
      )}
    </div>

    // <div>
    //   {isOnline ? (
    //     <p>You are online</p>
    //   ) : (
    //     <p>You are offline</p>
    //   )}
    // </div>
  );
};

export default ConnectionStatus;
