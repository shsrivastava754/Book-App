import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../styles/style.scss';
import { getCartCount } from '../../services/cart.service';

import { Dropdown } from 'react-bootstrap';

/**
 * Function that returns the navbar component
 * @returns {React.Component} Header component
 */
const Header = forwardRef((props,ref) => {

  const [cartCount, setCartCount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async ()=>{
      const result =  await getCartCount();
      setCartCount(result);
    })();
  }, [cartCount]);

  // Expose changeCartCount to the parent component
  useImperativeHandle(ref, () => ({
    changeCartCount
  }));
  

  /**
   * Function to logout the user from current session
   */
  const logout = ()=>{
    // Clear browser localStorage
    localStorage.clear();
    navigate('/');
  }

  /**
   * Function to change the count of cart
   */
  const changeCartCount = async ()=>{
    const result = await getCartCount();
    console.log(result);
    setCartCount(result);
  }

  
  /**
   * Function to navigate to carts section
   */
  const cart = ()=>{
    navigate('/books/cart');
  }

  /**
   * Function to navigate to a route which shows details of user with given ID
   * @param {Object} user 
   */
  const getDetails = (id)=>{
    navigate(`/profile/${id}`);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <Link className='navbar-brand' to='/books'>Book App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/books">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/books">Books</Link>
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
          <i className="fa-solid fa-cart-shopping cart-icon"></i>
          <span class="cart-count">{cartCount}</span>
        </button>
        
        <Dropdown>
          <Dropdown.Toggle className='navDropdown'>
            <i className="fa-solid fa-user"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdownMenu'>
            {/* <p>Hello {JSON.parse(localStorage.getItem("user"))["username"]}</p> */}
            {
              JSON.parse(localStorage.getItem("user"))?
              <p>Hello {JSON.parse(localStorage.getItem("user"))["username"]}</p>
              : null
            }
            <Dropdown.Item className='dropdownItem' onClick={()=>{getDetails(JSON.parse(localStorage.getItem("user"))._id)}}><i className="fa-solid fa-user"></i>&nbsp;&nbsp;Profile</Dropdown.Item>
            <Dropdown.Item href="/books" className='dropdownItem'><i className="fa-solid fa-book"></i>&nbsp;&nbsp;Books</Dropdown.Item>
            <Dropdown.Item href="/books/cart" className='dropdownItem'><i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Cart</Dropdown.Item>
            <Dropdown.Item className='dropdownItem' onClick={logout}><i className="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
    </nav>
  )
});

export default Header