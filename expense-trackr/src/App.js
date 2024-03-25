// src/App.js

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {
    // State to track user authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle user login
    const handleLogin = () => {
        // Perform login logic (e.g., validate credentials)
        // If login is successful, set isLoggedIn to true
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            {/* Conditionally render login form or dashboard */}
            {isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} />}
        </div>
    );
}

export default App;
