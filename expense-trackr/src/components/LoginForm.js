import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(true);
        // Redirect to dashboard or any other page after successful login
        navigate('/dashboard');
      } else {
        // Handle login failure
        setLoginError(data.message || 'Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={credentials.email}
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
