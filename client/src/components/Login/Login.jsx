import React, { useState } from 'react';
import '../../assets/css/login.css';
import LoginContainer from './LoginContainer.js';

const Login = () => {
  const {formik, navigate} = LoginContainer();
  if(localStorage.getItem('loggedIn') === 'true') {
    navigate('/');
  }
  return (
    <section className="login-section">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
