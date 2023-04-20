import "./authenticationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, React } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleLogo from "../../images/googleLogo.png";
import bg1 from "../../images/bg1.jpg";
import bg2 from "../../images/bg2.jpg";
import bg3 from "../../images/vg3.jpg";

/**
 * Returns Login Form Component
 * @param {Object} props 
 * @returns {React.Component} login component
 */
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  /**
   * Function to send request to backend for google authentication
   */
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

  /**
   * Function to handle hiding and showing password
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
   * Function to validate the form
   * @param {Event} e 
   */
  const login = async (e) => {
    e.preventDefault();

    // don't use not equal for if else
    if (username && password) {
      setMessage("");
      setDisabled(false);
      loginUser(username, password);
      setUsername("");
      setPassword("");
    } else {
      setMessage("All fields are mandatory");
    }
  };

  /**
   * Function to send request to backend for logging user into the app
   * @param {String} username 
   * @param {String} password 
   */
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
    const body = document.querySelector('body');
    body.style = `background: url(${bg});background-size:cover;background-repeat:no-repeat;`
  }

  setBackground(bg1);

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
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
