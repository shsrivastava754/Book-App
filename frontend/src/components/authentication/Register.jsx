import React from 'react'
import '../../styles/authenticationStyle.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [username, setusername] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

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

    const register = (e)=>{
        e.preventDefault();

        registerUser(name,username,email,password);
        setname("");
        setpassword("");
        setusername("");
        setemail("");
    };
    
    const registerUser = async(name,username,email,password)=>{
        try {
            await axios.post('http://localhost:3001/register',{
                name:name,
                email:email,
                username: username,
                password: password
            }).then((res)=>res.data);
            toast.success("Registered new user");
        } catch (error) {
            toast.error("User already exists");
        }
    }

  return (
    <>

    <div className="register-card">
        <h2>Register</h2>
        <h3>Enter your credentials</h3>
        <form className="register-form" onSubmit={register} autoComplete='off'>
            <input type="text" placeholder='Name' name='name' id='name' value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input type="text" placeholder='Username' name='username' id='username' value={username} onChange={(e)=>{setusername(e.target.value)}} />
            <input type="email" placeholder='Email' name='email' id='email'  value={email} onChange={(e)=>{setemail(e.target.value)}} />
            <input type="password" placeholder='Password' name='password' id='password'  value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
            <Link to={"/login"}>Already have an account?</Link>
            <button type='submit' id='submitBtn'>Register</button>
        </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default Register;