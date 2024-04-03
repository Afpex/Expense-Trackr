// models/Expense.js

import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
