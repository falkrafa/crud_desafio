import React from 'react';
import '../../assets/css/register.css';
import RegisterContainer from './RegisterContainer';
const Register = () => {
  
  const {formik} = RegisterContainer();
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
