import React from 'react'
import '../../styles/authenticationStyle.css';
import { Link } from 'react-router-dom';

const register = () => {
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

  return (
    <>
    <div className='loginContainer'>
        <h1>Register</h1>

        <form class="registerForm" action="/login" method="POST">
            <div class="mainForm">
                <input type="text" placeholder="Enter username" class="username" name="username" id="username" />
                <input type="email" placeholder="Enter email" class="email" name="email" id="email" />
                <input type="password" placeholder="Enter Password" name="password" id="password" />
                <span class="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
                <button type="submit" class="submitBtn" id="submitBtn">Register</button>

                <p>Already a user? <Link to="/login">Login Here</Link></p>
            </div>
        </form>
    </div>
    </>
  )
}

export default register;