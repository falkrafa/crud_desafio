import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/css/login.css';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUser } from '../../reducers/authReducer.js';
import { auth } from '../../Processer/auth.js';


const LoginContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
        auth(values, dispatch, navigate)
      } catch (error) {
        console.error('Error during login', error);
      }
    },
  });
  return {formik, navigate}
};

export default LoginContainer;

