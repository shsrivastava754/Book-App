import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import Cookies from 'js-cookie';

const ProtectAdmin = () => {
    let flag;
    Cookies.get('userToken')?JSON.parse(Cookies.get('userToken')).role==='Admin'?flag=true:flag=false:flag=false;
  return (
    flag ? <Outlet/> : <Navigate to="/books"/>
  )
}

export default ProtectAdmin;