import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ loggedIn, user }) => {

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <section className="home-section">
      <div className="buttons">
        {loggedIn ? (
          <>
            {user && (
              <p>Welcome, {user.name}</p>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;