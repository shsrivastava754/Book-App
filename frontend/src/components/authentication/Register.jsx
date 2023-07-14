import { Link, useNavigate } from "react-router-dom";
import { useState, React, useEffect } from "react";

import "./authenticationStyle.scss";
import { metadata } from '../../metadata/metadata';

import UserService from "../../services/user.service";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // State variables for the form fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   State variable for email validation and password validation
  const [emailError, setEmailError] = useState("");

  //   State variable for disabling the submit button
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setBackground();
  }, []);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  /**
   * Function to handle view and hide password
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
   * Function to check if all fields are filled or not
   * @param {Event} e
   */
  const register = (e) => {
    e.preventDefault();
    if (name && email && username && password) {
      setDisabled(false);
      registerUser(name, username, email, password);
    } else {
      setDisabled(true);
    }
  };

  /**
   * Function to send request to backend for registering new user
   * @param {String} name
   * @param {String} username
   * @param {String} email
   * @param {String} password
   */
  const registerUser = async (name, username, email, password) => {
    const response = await UserService.registerUser(name, username, email, password);
    const otpResponse = await UserService.sendOtp(response.data.newUser._id);
    if(otpResponse){
      navigate('/verifyEmail',{
        state:{
          id: response.data.newUser._id,
          email
        }
      });
    }
  };

  /**
   * Function for email validation
   * @param {Event} e
   * @returns {Boolean} Email is right or not
   */
  const checkEmail = (e) => {
    setEmail(e.target.value);
    if (name && email && username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    // Check if email regex matches the value entered by user
    if (emailRegex.test(e.target.value) === false) {
      setEmailError("Please enter a valid email address");
      setDisabled(true);
    } else {
      setEmailError("");
      return true;
    }
  };

  /**
   * Function to set password in the state variable
   * @param {Event} e
   */
  const checkPassword = (e) => {
    setPassword(e.target.value);
    if (name && email && username && password && emailError=="") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  /**
   * Function to set name in the state variable
   * @param {Event} e
   */
  const checkName = (e) => {
    setName(e.target.value);
    if (name && email && username && password && emailError=="") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  /**
   * Function to set username in the state variable
   * @param {Event} e
   */
  const checkUsername = (e) => {
    setUsername(e.target.value);
    if (name && email && username && password && emailError=="") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  function setBackground() {
    let body = document.querySelector("body");
    body.style = `background-color: rgba(195, 207, 216, 0.873);background-size:cover;background-repeat:no-repeat;`;
  }

  return (
    <>
    <div className="container auth-container">
      <div className="row">
      <div className="col-sm-6 left">
        <h1>{metadata.appName}</h1>
        <h2>{metadata.appTagline}</h2>
        <img src={metadata.appSvg} alt="donation image" className="mt-5 img-responsive" />
      </div>
      <div className="col-sm-6 right">
      <div className="register-card">
        <h2>Register</h2>
        <h3>Enter your credentials</h3>
        <form className="register-form" onSubmit={register} autoComplete="off">
          <div class="form-floating mb-3">
            <input type="text" placeholder="Name" name="name" id="name" value={name} onChange={checkName} className="form-control" />
            <label htmlFor="name">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" placeholder="Username" name="username" id="username" value={username} onChange={checkUsername} className="form-control" />
            <label htmlFor="username">Username</label>
          </div>
          <div class="form-floating">
            <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={checkEmail} className="form-control" />
            <label htmlFor="email">Email</label>
          </div>
          <p className="text-danger m-0 p-0">{emailError}</p>
          <div className="input-container form-floating">
            <input className="input-field form-control" type="password" placeholder="Password" name="password" id="password" value={password} onChange={checkPassword}/>
            <label htmlFor="password">Password</label>
            <span onClick={handleToggle}><i className="fa-solid fa-eye-slash end-button" id="toggle"></i></span>
          </div>
          <Link to={"/login"}>Already have an account?</Link>
          <button type="submit" id="submitBtn" disabled={disabled}>
            Register
          </button>
        </form>
      </div>
      </div>
      </div>
    </div>
      <ToastContainer />
    </>
  );
};

export default Register;
