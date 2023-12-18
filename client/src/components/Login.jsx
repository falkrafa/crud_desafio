import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../assets/css/login.css';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUser } from '../reducers/authReducer.js';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(localStorage.getItem('loggedIn') === 'true') {
    navigate('/');
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful', data.user, data.token);
          dispatch(setLoggedIn(true));
          dispatch(setUser(data.user));
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          navigate('/');
        } else {
          console.error('Login failed', data.message);
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    },
  });

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
