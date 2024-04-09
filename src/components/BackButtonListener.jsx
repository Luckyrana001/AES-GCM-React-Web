import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { isAuthPageAtom } from "../config/AppConfig";
import { atom, useAtom } from 'jotai';
import { Box } from '@mui/material';
import { useHistory } from "react-router-dom";

// componentDidMount() {
//     window.history.pushState(null, document.title, window.location.href);
//     window.addEventListener('popstate', function (event){
//         window.history.pushState(null, document.title,  window.location.href);
//     });
//   };

export const BackButtonListener = ({ children }) => {

  const location = useLocation();
  const { hash, pathname, search } = location;
  const navigate = useNavigate();

    
    const [pressed, setPressed] = React.useState(false)
    const [isAuthPage, setAuthStatus] = useAtom(isAuthPageAtom)

    React.useEffect(() => {
      window.onpopstate = e => {
        
        setPressed(true)
        console.log("pathname====="+pathname)
        if(!isAuthPage && pathname==="/"){
              setAuthStatus(true);   
              console.log("if block==="+pathname+"=====isAuthPage-----"+isAuthPage)
          } 
          else if(isAuthPage && pathname==="/" || isAuthPage && pathname==="/"){
            navigate("/");
            console.log("else if block==="+pathname +"=====isAuthPage-----"+isAuthPage)
          }
          else { 
              setAuthStatus(false)
              console.log("else block===="+pathname+"=====isAuthPage-----"+isAuthPage)
            }
             
      
      };
    });



   return (
      <Box>
      {/* <div>Pathname: <b>{pathname}</b><br />
      Search params: <b>{search}</b><br />
      Hash: <b>{hash}</b></div>
      <h3>Back button: {pressed.toString()}</h3> */}
      </Box>
    );
  };