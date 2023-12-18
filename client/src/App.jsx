import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";

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

  return (
    <div className="app-section">
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} user={user} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}/>
        {user && localStorage.getItem('token') ? (
          <Route path="/profile/:userId" element={<Profile />} />
        ) : null}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
