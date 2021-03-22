import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Alert from "../misc/Alert";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function submitData(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
    console.log(isAuthenticated);
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
        <h3>Sign In</h3>
      </header>
      <form className='form' onSubmit={(e) => submitData(e)}>
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

        <button className='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
