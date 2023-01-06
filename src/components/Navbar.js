import React from 'react'
import {
    Link,
    useHistory,
    useLocation
  } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  let location = useLocation();

  React.useEffect(() => {
  }, [location]);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                </li>
            </ul>
            {
              !localStorage.getItem('token')
              ?
              <form className="d-flex" role="search">
              <Link role="button" className="btn btn-primary mx-1" to="/login">Login</Link>;
              <Link role="button" className="btn btn-primary mx-1" to="/signup">SignUp</Link>;
              </form>
              : 
              <button className="btn btn-danger" onClick={handleLogout}>LogOut</button>
            }
            </div>
        </div>
    </nav>
  )
}

export default Navbar