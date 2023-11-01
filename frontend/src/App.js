import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import DiscordChatWidget from './components/DiscordWidget';
import ResetPassword from './components/ResetPassword';

function App() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Clear user role when logging out
    navigate('/login');
  };

  const appClassName = isLoggedIn ? 'App logged-in' : 'App';

  return (
    <div className={appClassName}>
      <Routes>
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
      </Routes>

      <div className="nav-buttons-container">
        {isLoggedIn ? (
          <div>
            <button
              className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
            {isLoggedIn && <DiscordChatWidget />}
          </div>
        ) : (
          <div>
            <button
              className={`nav-button ${location.pathname === '/register' ? 'active' : ''}`}
            >
              <a href="/register">Sign Up</a>
            </button>
            <button
              className={`nav-button ${location.pathname === '/login' ? 'active' : ''}`}
            >
              <Link to="/login">Log In</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;