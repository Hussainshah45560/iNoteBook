import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login'); // Navigate to login
    console.log('Navigating to /login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/Home">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
          </ul>
          <h2 className="mx-auto">Welcome to iNoteBook</h2>
          {!localStorage.getItem("token") ? (
        <div className="ms-auto navbar-nav">
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            SignUp
          </Link>
        </div>
      ) : (
        <Link onClick={handleLogout} className="ms-auto nav-link" to="/login">
          Logout
        </Link>
      )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
