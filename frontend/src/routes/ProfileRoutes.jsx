import React from 'react'
import { Outlet, Navigate, useParams } from 'react-router-dom'

import Cookies from 'js-cookie';

const ProfileRoutes = () => {

    // Id of the user
    let flag;
    if(Cookies.get('userToken')===undefined ){
        flag = false;
    } else {
        flag = true;
    }
  return (
    flag ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProfileRoutes;