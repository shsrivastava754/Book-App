import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie';

const ProtectLogin = () => {
    let flag;
    if(Cookies.get('userToken')===undefined){
        flag = true;
    } else {
        flag = false;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/books"/>
  )
}

export default ProtectLogin;