import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

const Navbar = () => {
const navigate = useNavigate();

const handleLogOut = () =>{
    localStorage.removeItem("authToken");
    navigate("/login");
}

  return (
    <div>
<nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
    <Link className="navbar-brand text-white fs-1" style={{fontWeight:"bold"}} to="/">GoFood</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
        </li>

        {(localStorage.getItem("authToken")) ?
        <li className="nav-item">
        <Link className="nav-link active text-white" aria-current="page" to="/Cart">My Oders</Link>
        </li>:""
        }

      </ul>

        {!(localStorage.getItem("authToken"))? 
        <div className='d-flex'>
          <Link className="btn text-white" to="/login">Login</Link>
          <Link className="btn text-white" to="/SignUp">SignUp</Link>
        </div>:
        <div> 
          <Link className="btn text-danger" to="/login" onClick={handleLogOut}>LogOut</Link>
        </div>
        }

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar

