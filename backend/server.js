// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import expensesRoutes from './routes/expensesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Configure CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow including cookies in cross-origin requests
}));

// Connect to MongoDB
const mongoURI = 'mongodb+srv://bondolo90:RoTKuRHDx2KZZHth@cluster0.qpajh96.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

//.then(() => console.log('Connected to MongoDB'))
//.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/expenses', authMiddleware, expensesRoutes); // Protect routes with authentication middleware
app.use('/auth', authRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
