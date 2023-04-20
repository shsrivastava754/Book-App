import React from "react";
import "./authenticationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleLogo from "../../images/googleLogo.png";

const Login = (props) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [message, setmessage] = useState("");

  let navigate = useNavigate();

  const responseGoogleSuccess = (response) => {
    console.log(response);
  };

  const responseGoogleFailure = (response) => {
    console.log(response);
  };

  const googleAuth = async () => {
    try {
      window.open("http://localhost:3001/auth/google/callback", "_self");
      let res = await axios.get(
        "http://localhost:3001/getUserData/returnLocalstorage"
      );
      console.log(res);
      localStorage.setItem("user", res.data.user);
      navigate("/books");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleToggle = () => {
    let pass = document.getElementById("password");
    let toggleBtn = document.getElementById("toggle");
    let currentType = pass.getAttribute("type");

    if (currentType === "password") {
      pass.setAttribute("type", "text");
      toggleBtn.setAttribute("class", "fa-solid fa-eye-slash");
    } else {
      pass.setAttribute("type", "password");
      toggleBtn.setAttribute("class", "fa-sharp fa-solid fa-eye toggle");
    }
  };

  const login = async (e) => {
    e.preventDefault();

    // don't use not equal for if else
    if (!username || !password) {
      setmessage("All fields are mandatory");
    } else {
      setmessage("");
      setdisabled(false);
      loginUser(username, password);
      setusername("");
      setpassword("");
    }
  };

  const loginUser = async (username, password) => {
    try {
      let res = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      });
      props.setLogin(true);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/books");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkUsername = (e) => {
    setusername(e.target.value);
    if (!username || !password) {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
  };

  const checkPassword = (e) => {
    setpassword(e.target.value);
    if (!username || !password) {
      setdisabled(true);
    } else {
      setdisabled(false);
    }
  };

  return (
    <>
      <div className="login-card">
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
        <form className="login-form" onSubmit={login} autoComplete="off">
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={checkUsername}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={checkPassword}
          />

          <span
            className="fa-sharp fa-solid fa-eye toggle"
            id="toggle"
            onClick={handleToggle}
          ></span>

          <p className="text-danger">{message}</p>
          <Link to={"/register"}>Don't have an account?</Link>
          <button type="submit" id="submitBtn" disabled={disabled}>
            Login
          </button>
          <p className="or">or</p>
          <button type="submit" id="submitBtnGoogle" onClick={googleAuth}>
            <img src={googleLogo} alt="jhb" width={32} /> &nbsp;Login with
            Google
          </button>
          {/* <GoogleLoginBtn/> */}
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
