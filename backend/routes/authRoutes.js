// authRoutes.js

import express from 'express';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /register - User registration
router.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Define secret key for JWT token
const JWT_SECRET = 'your_jwt_secret_key';

// POST /login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Failed to log in' });
  }
});

// POST /logout - User logout
router.post('/api/logout', authMiddleware, (req, res) => {
  // Implement logout logic (e.g., invalidate JWT token)
  res.status(200).json({ message: 'User logged out successfully' });
});

// POST /password-reset - Password reset
router.post('/api/password-reset', (req, res) => {
  // Implement password reset logic
  res.status(200).json({ message: 'Password reset request received' });
});

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
};

export default router;