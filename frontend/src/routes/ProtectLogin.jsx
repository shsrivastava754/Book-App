import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectLogin = () => {
    let flag;
    if(localStorage.getItem("user")===null){
        flag = true;
    } else {
        flag = false;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/books"/>
  )
}

export default ProtectLogin;