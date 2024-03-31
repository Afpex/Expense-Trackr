// SignupForm.js

import React, { useState } from 'react';

const SignupForm = () => {
  // State for managing form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Make a POST request to the backend signup endpoint
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // User registered successfully
      // Redirect to login page or display success message
    } else {
      // Registration failed, handle error
      console.error('Registration error:', await response.json());
      // Display error message to the user
    }
  } catch (error) {
    console.error('Error registering user:', error);
    // Display error message to the user
  }
};

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // JSX for the signup form
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;