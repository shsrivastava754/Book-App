import "./authenticationStyle.css";
import { Link } from "react-router-dom";
import { useState, React } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  // State variables for the form fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   State variable for email validation and password validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //   State variable for disabling the submit button
  const [disabled, setDisabled] = useState(true);

  //   State variable for the message if fields are empty
  const [message, setMessage] = useState("");

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = {
    uppercaseRegExp: /(?=.*?[A-Z])/,
    lowercaseRegExp: /(?=.*?[a-z])/,
    digitsRegExp: /(?=.*?[0-9])/,
    specialCharRegExp: /(?=.*?[#?!@$%^&*-])/,
    minLengthRegExp: /.{8,}/,
  };

  /**
   * Function to handle view and hide password
   */
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

  /**
   * Function to check if all fields are filled or not
   * @param {Event} e
   */
  const register = (e) => {
    e.preventDefault();
    if (name && email && username && password) {
      setMessage("");
      setDisabled(false);
      registerUser(name, username, email, password);
      setName("");
      setPassword("");
      setUsername("");
      setEmail("");
    } else {
      setMessage("All fields are mandatory");
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
    try {
      await axios
        .post("http://localhost:3001/register", {
          name: name,
          email: email,
          username: username,
          password: password,
        })
        .then((res) => res.data);
      toast.success("Registered new user");
    } catch (error) {
      toast.error("User already exists");
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
    } else {
      setEmailError("");
      return true;
    }
  };

  const checkPasswordRegex = (password) => {
    return (
      passwordRegex.digitsRegExp.test(password) &&
      passwordRegex.lowercaseRegExp.test(password) &&
      passwordRegex.minLengthRegExp.test(password) &&
      passwordRegex.specialCharRegExp.test(password) &&
      passwordRegex.uppercaseRegExp.test(password)
    );
  };

  /**
   * Function to set password in the state variable
   * @param {Event} e
   */
  const checkPassword = (e) => {
    setPassword(e.target.value);
    if (name && email && username && password) {
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
    if (name && email && username && password) {
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
    if (name && email && username && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

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
