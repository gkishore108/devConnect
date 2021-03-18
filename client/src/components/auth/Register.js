import React, { useState } from "react";
import "../../styles/form.scss";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordVerify: "",
  });

  const { userName, email, password, passwordVerify } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  function submitData(e) {
    e.preventDefault();
    if (password !== passwordVerify) {
      console.log("Password doesn't match");
    } else {
      console.log(formData);
    }
  }

  return (
    <div className='auth-form'>
      <header className='user-header'>
        <img
          src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg'
          alt=''
        />
        <h3 className='user-title'>Register here to gain access!</h3>
      </header>
      <form className='form' onSubmit={(e) => submitData(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Username'
            className='form-input'
            name='userName'
            value={userName}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div class='form-group'>
          <input
            type='email'
            placeholder='Email *'
            class='form-input'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div class='form-group'>
          <input
            type='password'
            placeholder='Password *'
            class='form-input'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div class='form-group'>
          <input
            type='password'
            placeholder='Verify Password *'
            class='form-input'
            name='passwordVerify'
            value={passwordVerify}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <button class='btn' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
