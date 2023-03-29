import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let flag;
    if(localStorage.getItem("token")===null){
        flag = false;
    } else {
        flag = true;
    }
    let auth = {'token':flag};
  return (
    auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes