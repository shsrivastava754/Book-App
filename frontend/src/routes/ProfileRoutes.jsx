import React from 'react'
import { Outlet, Navigate, useParams } from 'react-router-dom'

const ProfileRoutes = () => {
    // Id that user is trying to access through url or other method
    const urlId = useParams().id;

    // Id of the user
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let flag;
    if(localStorage.getItem("user")===null && (urlId===userId) ){
        flag = false;
    } else {
        flag = true;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProfileRoutes;