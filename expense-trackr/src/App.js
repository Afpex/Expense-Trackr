// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (success) => {
        setIsLoggedIn(success);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={<LoginForm onLogin={() => handleLogin(true)} />} />
                    <Route path="/signup" element={<SignupForm />} />
                    {/* Redirect users trying to access undefined routes to the login page or a NotFound component */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
