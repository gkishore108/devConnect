import React from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Navbar.scss";
import { logout } from "../actions/auth";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const history = useHistory();

  const authLinks = (
    <div className='auth-buttons'>
      <Link onClick={() => dispatch(logout())}>
        <i class='fa fa-sign-out' aria-hidden='true'></i>
        <span>Logout</span>
      </Link>
      {history.push("/login")}
    </div>
  );

  const guestLinks = (
    <div className='auth-buttons'>
      <Link to='/login'>Log In</Link>
      <Link to='/register'>Register</Link>
    </div>
  );
  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1 className='title'>dev.connect()</h1>
      </Link>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks} </>}
    </nav>
  );
}

export default Navbar;
