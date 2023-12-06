import React from "react"
import { Routes, Route } from 'react-router-dom'
import Home from './components/home.jsx'
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"

function App() {
  

  return (
    <div className="app-section">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
       </Routes>
    </div>
  )
}

export default App
