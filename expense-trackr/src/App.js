import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        // Additional login logic
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
                </nav>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Dashboard /> : <Link to="/login" />} />
                    <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupForm />} />
                    {/* Redirect to login if route is unknown, or consider adding a NotFound component */}
                    <Route path="*" element={<Link to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

