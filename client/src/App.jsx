import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Profile from "./components/Profile/Profile.jsx";
import { useDispatch, useSelector} from "react-redux";
import { setLoggedIn, setUser } from "./reducers/authReducer.js";

function App() {
  const user = useSelector((state)=> state.auth.user)
  const dispatch = useDispatch();

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    const storedUser = localStorage.getItem('user');

    if (storedLoggedIn) {
      dispatch(setLoggedIn(true));
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, []);

  return (
    <div className="app-section">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>}/>
        {user && localStorage.getItem('token') ? (
          <Route path="/profile/:userId" element={<Profile />} />
        ) : null}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
