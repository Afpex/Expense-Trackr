// components/LoginForm.js

import React, { useState } from 'react';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform client-side validation
      if (!credentials.username || !credentials.password) {
        throw new Error('Please enter both username/email and password');
      }

      // Make a request to authenticate the user
      const response = await fetch('http://localhost:5000/api/login', { // Update URL to match your backend server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      // Check if the request was successful
      if (response.ok) {
        // User authenticated successfully, redirect or update UI accordingly
        // For example, you can redirect the user to the dashboard
        window.location.href = '/dashboard';
      } else {
        // Authentication failed, handle error
        const data = await response.json();
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error.message);
      // Update UI to display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username/Email:
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
