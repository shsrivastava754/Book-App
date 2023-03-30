import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../style.css';

const Header = (props) => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("user");
    props.setLogin(false);
    navigate('/');
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
            </ul>
          </div>
        </div>
        
        <button id='logout' onClick={logout}>
          <div>Logout</div>
        </button>
        
    </nav>
  )
}

export default Header