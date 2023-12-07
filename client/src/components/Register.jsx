import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../assets/css/register.css';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    profilePicture: Yup.mixed().required('Profile picture is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      profilePicture: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });

        const formDataWithFile = new FormData();
        formDataWithFile.append('name', values.name);
        formDataWithFile.append('email', values.email);
        formDataWithFile.append('password', values.password);
        formDataWithFile.append('profilePicture', values.profilePicture);

        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          body: formDataWithFile,
        });

        if (response.ok) {
          console.log('Registration successful');
          navigate('/login');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Validation Error:', error.errors);
      }
    },
  });

  return (
    <section className="register-section">
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <input
            type="email"
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
        <div>
          <input
            type="file"
            name="profilePicture"
            onChange={(e) => {
              formik.setFieldValue('profilePicture', e.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div className="error-message">{formik.errors.profilePicture}</div>
          )}
        </div>
        <input type="submit" value="Register" />
      </form>
    </section>
  );
};

export default Register;
