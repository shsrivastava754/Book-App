import { Link, useNavigate } from "react-router-dom";
import { useState, React } from "react";

import "./authenticationStyle.scss";
import bg6 from "../../images/bg6.jpg";

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

  function setBackground(bg) {
    let body = document.querySelector("body");
    body.style = `background: url(${bg}) rgba(255, 0, 150, 0.3);background-size:cover;background-repeat:no-repeat;background-blend-mode: multiply;`;
  }

  setBackground(bg6);

  return (
    <>
      <div className="register-card">
        <h2>Register</h2>
        <h3>Enter your credentials</h3>
        <form className="register-form" onSubmit={register} autoComplete="off">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            value={name}
            onChange={checkName}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={checkUsername}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={email}
            onChange={checkEmail}
          />
          <p className="text-danger m-0 p-0">{emailError}</p>
          <div className="input-container">
            <input className="input-field" type="password" placeholder="Password" name="password" id="password" value={password} onChange={checkPassword}/>
            <span onClick={handleToggle}><i className="fa-solid fa-eye-slash end-button" id="toggle"></i></span>
          </div>
          <Link to={"/login"}>Already have an account?</Link>
          <button type="submit" id="submitBtn" disabled={disabled}>
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
