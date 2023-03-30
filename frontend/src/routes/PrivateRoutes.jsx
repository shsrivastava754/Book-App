import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let flag;
    if(localStorage.getItem("user")===null){
        flag = false;
    } else {
        flag = true;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes