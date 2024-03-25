// components/Dashboard.js

import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = () => {
    // State for managing expense data
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        amount: '',
        description: ''
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new expense to the expenses array
        setExpenses([...expenses, newExpense]);
        // Clear the form fields
        setNewExpense({ amount: '', description: '' });
    };

    // Function to handle input changes
    const handleChange = (e) => {
        setNewExpense({
            ...newExpense,
            [e.target.name]: e.target.value
        });
    };

    // Calculate total amount of expenses
    const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div>
            <h2>Dashboard</h2>

            {/* Form for adding new expenses */}
            <div>
                <h3>Add Expense</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Amount:
                        <input type="number" name="amount" value={newExpense.amount} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={newExpense.description} onChange={handleChange} />
                    </label>
                    <button type="submit">Add Expense</button>
                </form>
            </div>

            {/* Display pie chart of expenses */}
            <div style={{ width: '300px', height: '300px', margin: '20px auto' }}>
                <h3>Expenses Proportions</h3>
                <PieChart
                    data={expenses.map(expense => ({
                        title: expense.description,
                        value: parseFloat(expense.amount),
                        color: '#' + Math.floor(Math.random()*16777215).toString(16) // Generate random color
                    }))}
                    label={({ dataEntry }) => `${dataEntry.title}: ${Math.round((dataEntry.value / totalAmount) * 100)}%`}
                />
            </div>

            {/* Display list of expenses */}
            <div>
                <h3>Expenses</h3>
                <ul>
                    {expenses.map((expense, index) => (
                        <li key={index}>{expense.description} - ${parseFloat(expense.amount).toFixed(2)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
