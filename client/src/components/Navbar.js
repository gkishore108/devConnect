import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1 className='title'>dev.connect()</h1>
      </Link>
      <div className='auth-buttons'>
        <Link to='/login'>Log In</Link>
        <Link to='/register'>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
