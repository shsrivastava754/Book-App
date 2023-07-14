import { useState, React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./authenticationStyle.scss";
import { metadata } from '../../metadata/metadata';

import UserService from "../../services/user.service";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';

/**
 * Returns Login Form Component
 * @param {Object} props
 * @returns {React.Component} login component
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setBackground();
  }, []);

  /**
   * Function to handle hiding and showing password
   */
  const handleToggle = () => {
    let pass = document.getElementById("password");
    let toggleBtn = document.getElementById("toggle");
    let currentType = pass.getAttribute("type");

    if (currentType === "password") {
      pass.setAttribute("type", "text");
      toggleBtn.setAttribute("class", "fa-sharp fa-solid fa-eye toggle");
    } else {
      pass.setAttribute("type", "password");
      toggleBtn.setAttribute("class", "fa-solid fa-eye-slash");
    }
  };

  /**
   * Function to validate the form
   * @param {Event} e
   */
  const login = async (e) => {
    e.preventDefault();

    // don't use not equal for if else
    if (email && password) {
      setDisabled(false);
      loginUser(email, password);
    }
  };

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Change the duration (in milliseconds) as needed
  };

  /**
   * Function to send request to backend for logging user into the app
   * @param {String} username
   * @param {String} password
   */
  const loginUser = async (email, password) => {
    try {
      setDisabled(false);
      let res = await UserService.loginUser(email, password);
      
      // Decode the token provided from backend
      const token = jwt_decode(res.data.token);

      if(res.data.user.isVerified){
      // Set the decoded details from token into the cookies which expires in 2 hours
      Cookies.set('userToken', JSON.stringify(token), { expires: 2 });

      // Set the token into cookies to send it to backend for verifying it at backend
      Cookies.set('token', res.data.token, { expires: 2 });

      // The user is verified
      Cookies.set('isVerified', true, { expires: 2 })
      
      navigate("/books");
      } else {
        handleClick();
      }


    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const checkEmail = (e) => {
    setEmail(e.target.value);
    if (!email || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const checkPassword = (e) => {
    setPassword(e.target.value);
    if (!email || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const setBackground = () => {
    let body = document.querySelector("body");
    body.style = `background-color: rgba(195, 207, 216, 0.873);background-size:cover;background-repeat:no-repeat;`;
  }

  return (
    <>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="text-center container">
          <strong>User is not verified</strong>
        </Alert>
      )}

      <div className="container auth-container">
        <div className="row">
          <div className="col-sm-6 left">
            <h1>{metadata.appName}</h1>
            <h2>{metadata.appTagline}</h2>
            <img src={metadata.appSvg} alt="donation image" className="mt-5 img-responsive" />
          </div>
          <div className="col-sm-6 right">
            
            <div className="login-card">
              <h2>Login</h2>
              <h3>Enter your credentials</h3>
              <form className="login-form" onSubmit={login} autoComplete="off">
                <div class="form-floating mb-3">
                  <input type="text" placeholder="Email" name="email" id="email" value={email} onChange={checkEmail} className="form-control"/>
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-container form-floating">
                  <input type="password" placeholder="Password" name="password" id="password" value={password} onChange={checkPassword} className="input-field form-control"/>
                  <label htmlFor="password">Password</label>
                  <span onClick={handleToggle}><i className="fa-solid fa-eye-slash end-button" id="toggle"></i></span>
                </div>
                <Link to={"/register"}>Don't have an account?</Link>
                <button type="submit" id="submitBtn" disabled={disabled}>
                  Login
                </button>
                <p className="or">or</p>
                <div className="googleLogin m-auto">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      let decoded = jwt_decode(credentialResponse.credential);
                      const userObj = {
                        email: decoded.email,
                        username: decoded.given_name,
                        role: "User",
                        name: decoded.name,
                        password: decoded.jti,
                      };

                      let res = await UserService.postGoogleUser(userObj);
                      const token = jwt_decode(res.data.token);

                      // Set the token into the cookies which expires in 2 hours
                      Cookies.set('userToken', JSON.stringify(token), { expires: 2/24 });

                      // Set the token into cookies to send it to backend for verifying it at backend
                      Cookies.set('token', res.data.token, { expires: 2 });

                      // Set is verified flag for the user
                      Cookies.set('isVerified', res.data.user.isVerified, { expires: 2 });

                      navigate("/books");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;