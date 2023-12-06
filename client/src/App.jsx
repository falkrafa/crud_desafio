import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/home.jsx';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedUser = localStorage.getItem('user');

    if (storedLoggedIn) {
      setLoggedIn(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  return (
    <div className="app-section">
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} user={user} />} />
        {!loggedIn ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
            />
          </>
        ) : null}
      </Routes>
    </div>
  );
}

export default App;
