import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate to use for navigation

  // State for managing form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // State for displaying a message to the user (error or success)
  const [message, setMessage] = useState('');

  // State for tracking whether the form has been submitted
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Submitting form...'); // Log a message to indicate form submission

    try {
      // Make a POST request to the backend to register the user
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // Send the form data as JSON
      });

      const data = await response.json(); // Parse the response data as JSON

      if (response.ok) {
        // If the response is ok, registration was successful
        setMessage('User registered successfully'); // Set a success message
        setSubmitted(true); // Set submitted to true
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page after 2 seconds
        }, 2000);
      } else {
        // If the response is not ok, show the error message from the response
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error); // Log any errors to the console
      setMessage('Failed to register. Please try again.'); // Set a fallback error message
    }
  };

  // Function to handle changes in the form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Update the form data with the new input values
    });
  };

  // Render the signup form
  return (
    <div>
      {!submitted ? (
        // Render the form if it has not been submitted
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        // Render a success message if the form has been submitted
        <p>{message}</p>
      )}
    </div>
  );
};

export default SignupForm;