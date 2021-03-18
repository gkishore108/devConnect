import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  }

  function submitData(e) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <div className='auth-form'>
      <header className='user-header'>
        <img
          src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3219/logo.svg'
          alt=''
        />
        <h3>Sign In</h3>
      </header>
      <form className='form' onSubmit={(e) => submitData(e)}>
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

        <button class='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
