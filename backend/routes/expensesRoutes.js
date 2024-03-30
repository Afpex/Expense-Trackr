// expensesRoutes.js

import express from 'express';

const router = express.Router();

// GET /expenses - Fetch all expenses
router.get('/', (req, res) => {
  // Handle GET request for fetching expenses
});

// POST /expenses - Create a new expense
router.post('/', (req, res) => {
  // Handle POST request for creating a new expense
});

// Add more routes for updating and deleting expenses if needed

export default router;
