import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/style.css';

/**
 * Function that returns the navbar component
 * @param {Object} props 
 * @returns {React.Component} Header component
 */
const Header = (props) => {
  const navigate = useNavigate();

  /**
   * Function to logout the user from current session
   */
  const logout = ()=>{
    // Clear browser localStorage
    localStorage.clear();
    props.setLogin(false);
    navigate('/');
    window.open('http://localhost:3001/auth/logout',"_self");
  }

  
  /**
   * Function to navigate to carts section
   */
  const cart = ()=>{
    navigate('/books/cart');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/books'>Book App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/books">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
              {
                localStorage.getItem("user")?
                JSON.parse(localStorage.getItem("user"))["role"]==='Admin'?
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                : null : null
              }
            </ul>
          </div>
        </div>
        
        <button id='cartIcon' onClick={cart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>  
        <button id='logout' onClick={logout}>
          <div>Logout</div>
        </button>
        
    </nav>
  )
}

export default Header