import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// Helper function to validate expense data
const validateExpense = (amount, description) => {
    // Basic validation: Ensure amount and description are provided
    // Expand this function based on your specific validation requirements
    return amount && description;
};

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
        if (!validateExpense(amount, description)) {
            return res.status(400).json({ message: 'Invalid expense data' });
        }
        const newExpense = new Expense({ amount, description });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Failed to create expense', error: error.message });
    }
});

// PUT /expenses/:id - Update an expense
router.put('/:id', async (req, res) => {
    try {
        const { amount, description } = req.body;
        if (!validateExpense(amount, description)) {
            return res.status(400).json({ message: 'Invalid expense data' });
        }
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, { amount, description }, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(updatedExpense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ message: 'Failed to update expense', error: error.message });
    }
});

// DELETE /expenses/:id - Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Failed to delete expense', error: error.message });
    }
});

export default router;
