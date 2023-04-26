import "./authenticationStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, React } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleLogo from "../../images/googleLogo.png";
import bg1 from "../../images/bg1.jpg";
import bg2 from "../../images/bg2.jpg";
import bg3 from "../../images/bg3.jpg";
import bg4 from "../../images/bg4.jpg";
import bg5 from "../../images/bg5.jpg";
import bg6 from "../../images/bg6.jpg";
import { googleLogin, loginUserRequest } from "../../services/app.service";

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
      window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
      let res = await googleLogin();
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
      let res = await loginUserRequest(username,password);
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
    let body = document.querySelector('body');
    body.style = `background: url(${bg}) rgba(255, 0, 150, 0.3);background-size:cover;background-repeat:no-repeat;background-blend-mode: multiply;`
  }

  setBackground(bg6);

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
