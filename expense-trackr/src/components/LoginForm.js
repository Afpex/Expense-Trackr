import React, { useState } from 'react';
// Optional: Import useNavigate if you want to redirect the user after login
// import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // const navigate = useNavigate(); // Uncomment if you're using useNavigate for redirection

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear any existing login errors

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Assuming login success updates the application state
        onLogin(true);
        // Optional: Redirect the user to another route upon successful login
        // navigate('/dashboard'); // Uncomment if redirecting
      } else {
        // If the login wasn't successful, inform the user
        // Here you could also parse the response body to show a detailed error message
        setLoginError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username/Email:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Login</button>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </form>
  );
};

export default LoginForm;
