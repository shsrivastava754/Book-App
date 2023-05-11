import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectAdmin = () => {
    let flag;
    localStorage.getItem("user")?JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?flag=true:flag=false:flag=false;
  return (
    flag ? <Outlet/> : <Navigate to="/books"/>
  )
}

export default ProtectAdmin;