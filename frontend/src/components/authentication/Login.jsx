import React from 'react'
import '../../styles/authenticationStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    let navigate = useNavigate();

    const handleToggle = ()=>{
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

    const login = async(e)=>{
        e.preventDefault();

        loginUser(username,password);
        setusername("");
        setpassword("");
    }

    const loginUser = async(username,password)=>{
        try {
            await axios.post('http://localhost:3001/login',{
                username: username,
                password: password,
            });
            props.setLogin(true);
            localStorage.setItem("token",username);
            navigate('/books');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

  return (
    <>
    <div className="login-card">
        <h2>Login</h2>
        <h3>Enter your credentials</h3>
        <form className="login-form" onSubmit={login}>
            <input type="text" placeholder='Username' name='username' id='username' value={username} onChange={(e)=>{setusername(e.target.value)}} />
            <input type="password" placeholder='Password' name='password' id='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
            <Link to={"/register"}>Don't have an account?</Link>
            <button type='submit' id='submitBtn'>Login</button>
        </form>
    </div>
    <ToastContainer/>

    </>
  )
}

export default Login;