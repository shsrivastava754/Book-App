import React from 'react'
import GoogleLogin from 'react-google-login'

const GoogleLoginBtn = () => {
    const responseGoogleSuccess = (response)=>{
        console.log(response);
    }

    const responseGoogleFailure = (response)=>{
        console.log(response);
    }

  return (
    <div>
        <GoogleLogin
            clientId="743741413482-q33cvp8cpahrug0j4009lga0f6eppbkn.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
        />

    
    </div>
  )
}

export default GoogleLoginBtn