// routes/expensesRoutes.js

import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// GET /expenses - Fetch all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
});

// POST /expenses - Create a new expense
router.post('/', async (req, res) => {
  try {
    const { amount, description } = req.body;
    const newExpense = new Expense({ amount, description });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Failed to create expense' });
  }
});

// PUT /expenses/:id - Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(id, { amount, description }, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Failed to update expense' });
  }
});

// DELETE /expenses/:id - Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Failed to delete expense' });
  }
});

export default router;
