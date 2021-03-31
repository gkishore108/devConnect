import React, { useState } from "react";
import "../../styles/form.scss";
import { Redirect } from "react-router-dom";

import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../misc/Alert";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordVerify: "",
  });

  const { userName, email, password, passwordVerify } = formData;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function submitData(e) {
    e.preventDefault();
    if (password !== passwordVerify) {
      dispatch(setAlert("Password does not match", "danger"));
    } else {
      dispatch(register({ userName, email, password, passwordVerify }));
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form'>
      <Alert />
      <header className='user-header'>
        <img
          src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg'
          alt=''
        />
        <h3 className='user-title'>Register here to gain access!</h3>
      </header>
      <form className='form' onSubmit={(e) => submitData(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            className='form-input'
            name='userName'
            value={userName}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='email'
            placeholder='Email *'
            className='form-input'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password *'
            className='form-input'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Verify Password *'
            className='form-input'
            name='passwordVerify'
            value={passwordVerify}
            onChange={(e) => onChange(e)}
          />
        </div>

        <button className='btn' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
