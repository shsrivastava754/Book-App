import React from 'react'
import './authenticationStyle.css';
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
    const [emailError,setemailError] = useState("");
    const [passwordError,setpasswordError] = useState("");
    const [disabled, setdisabled] = useState(true);
    const [message, setmessage] = useState("");
    
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = {
        'uppercaseRegExp'   : /(?=.*?[A-Z])/,
    'lowercaseRegExp'   : /(?=.*?[a-z])/,
     'digitsRegExp'      : /(?=.*?[0-9])/,
     'specialCharRegExp' : /(?=.*?[#?!@$%^&*-])/,
     'minLengthRegExp'   : /.{8,}/
    };

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
        if(!name || !email || !username || !password){
            setmessage("All fields are mandatory");
            setdisabled(true);
        } else {
            setmessage("");
            setdisabled(false);
            registerUser(name,username,email,password);
            setname("");
            setpassword("");
            setusername("");
            setemail("");
        }

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

    const checkEmail = (e)=>{
        setemail(e.target.value);
        if(!name || !email || !username || !password){
            setdisabled(true);
        } else {
            setdisabled(false);
        }
        if(emailRegex.test(e.target.value)===false){
            setemailError("Please enter a valid email address");
        } else {
            setemailError('');
            return true;
        }
    }

    const checkPasswordRegex = (password)=>{
        return passwordRegex.digitsRegExp.test(password) &&
                  passwordRegex.lowercaseRegExp.test(password) &&
                  passwordRegex.minLengthRegExp.test(password) &&
                  passwordRegex.specialCharRegExp.test(password) &&
                  passwordRegex.uppercaseRegExp.test(password);
    }

    const checkPassword = (e)=>{
        setpassword(e.target.value);
        if(!name || !email || !username || !password){
            setdisabled(true);
        } else {
            setdisabled(false);
        }
    }

    const checkName = (e)=>{
        setname(e.target.value);
        if(!name || !email || !username || !password){
            setdisabled(true);
        } else {
            setdisabled(false);
        }
    }

    const checkUsername = (e)=>{
        setusername(e.target.value);
        if(!name || !email || !username || !password){
            setdisabled(true);
        } else {
            setdisabled(false);
        }
    }

  return (
    <>

    <div className="register-card">
        <h2>Register</h2>
        <h3>Enter your credentials</h3>
        <form className="register-form" onSubmit={register} autoComplete='off'>
            <input type="text" placeholder='Name' name='name' id='name' value={name} onChange={checkName} />
            <input type="text" placeholder='Username' name='username' id='username' value={username} onChange={checkUsername} />
            <input type="email" placeholder='Email' name='email' id='email'  value={email} onChange={checkEmail} />
            <p className='text-danger m-0 p-0'>{emailError}</p>
            <input type="password" placeholder='Password' name='password' id='password'  value={password} onChange={checkPassword} />
            <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
            <p className='text-danger'>{message}</p>
            <Link to={"/login"}>Already have an account?</Link>
            <button type='submit' id='submitBtn' disabled={disabled}>Register</button>
        </form>
    </div>
    <ToastContainer />
    </>
  )
}

export default Register;