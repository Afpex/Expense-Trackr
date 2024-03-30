// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import expensesRoutes from './routes/expensesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/expenses', expensesRoutes);
app.use('/auth', authRoutes);

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
