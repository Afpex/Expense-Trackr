import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        amount: '',
        description: ''
    });

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('http://localhost:5000/expenses');
            if (response.ok) {
                const data = await response.json();
                setExpenses(data);
            } else {
                console.error('Failed to fetch expenses:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newExpense)
            });
            if (response.ok) {
                setNewExpense({ amount: '', description: '' });
                fetchExpenses();
            } else {
                console.error('Failed to add expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const handleChange = (e) => {
        setNewExpense({
            ...newExpense,
            [e.target.name]: e.target.value
        });
    };

    const totalAmount = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div>
            <h2>Dashboard</h2>

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

            <div style={{ width: '300px', height: '300px', margin: '20px auto' }}>
                <h3>Expenses Proportions</h3>
                <PieChart
                    data={expenses.map(expense => ({
                        title: expense.description,
                        value: parseFloat(expense.amount),
                        color: '#' + Math.floor(Math.random()*16777215).toString(16)
                    }))}
                    label={({ dataEntry }) => `${dataEntry.title}: ${Math.round((dataEntry.value / totalAmount) * 100)}%`}
                />
            </div>

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
