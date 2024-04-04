import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Adjust based on your actual context implementation

  const handleLogout = async () => {
    try {
      // Assuming logout logic might involve a server call to clear cookies
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include', // Needed if your server sets HttpOnly cookies
      });
      // Assuming client side token management
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
