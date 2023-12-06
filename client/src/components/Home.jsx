import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {

  return (
    <section className="home-section">
      <div className="buttons">
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
      </div>
    </section>
  );
};

export default Home;