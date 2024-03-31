// src/App.js

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';

function App() {
    // State to track user authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to handle user login
    const handleLogin = () => {
        // Perform login logic (e.g., validate credentials)
        // If login is successful, set isLoggedIn to true
        setIsLoggedIn(true);
    };

    // JSX to render the SignupForm component
    const renderSignupForm = () => {
        return (
            <div>
                <h2>Sign Up</h2>
                <SignupForm />
            </div>
        );
    };

    return (
        <div className="App">
            {/* Conditionally render login form, signup form, or dashboard */}
            {isLoggedIn ? <Dashboard /> : <LoginForm onLogin={handleLogin} />}
            {renderSignupForm()} {/* Render the SignupForm component */}
        </div>
    );
}

export default App;
