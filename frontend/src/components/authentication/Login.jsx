import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./authenticationStyle.scss";
import bg6 from "../../images/bg6.jpg";

import {
  loginUserRequest,
  postGoogleUser,
} from "../../services/user.service";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

/**
 * Returns Login Form Component
 * @param {Object} props
 * @returns {React.Component} login component
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  let navigate = useNavigate();

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
    if (username && password) {
      setDisabled(false);
      loginUser(username, password);
    }
  };

  /**
   * Function to send request to backend for logging user into the app
   * @param {String} username
   * @param {String} password
   */
  const loginUser = async (username, password) => {
    try {
      let res = await loginUserRequest(username, password);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/books");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkUsername = (e) => {
    setUsername(e.target.value);
    if (!username || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const checkPassword = (e) => {
    setPassword(e.target.value);
    if (!username || !password) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  function setBackground(bg) {
    let body = document.querySelector("body");
    body.style = `background: url(${bg}) rgba(255, 0, 150, 0.3);background-size:cover;background-repeat:no-repeat;background-blend-mode: multiply;`;
  }

  setBackground(bg6);

  return (
    <>
      <div className="login-card">
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
        <form className="login-form" onSubmit={login} autoComplete="off">
          <input type="text" placeholder="Username" name="username" id="username" value={username} onChange={checkUsername}/>
          <div className="input-container">
            <input type="password" placeholder="Password" name="password" id="password" value={password} onChange={checkPassword} className="input-field"/>
            <span onClick={handleToggle}><i className="fa-solid fa-eye-slash end-button" id="toggle"></i></span>
          </div>
          <Link to={"/register"}>Don't have an account?</Link>
          <button type="submit" id="submitBtn" disabled={disabled}>
            Login
          </button>
          <p className="or">or</p>
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

              let res = await postGoogleUser(userObj);
              localStorage.setItem("user", JSON.stringify(res.user));
              navigate("/books");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
