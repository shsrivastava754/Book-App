import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie';
import "react-toastify/dist/ReactToastify.css";

const PrivateRoutes = () => {
    let flag;
    if(Cookies.get('userToken')==undefined){
      flag = false;
    } else {
      flag = true;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/" />
  )
}

export default PrivateRoutes;