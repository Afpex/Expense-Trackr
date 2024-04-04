import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '' });
    const [editingExpense, setEditingExpense] = useState(null); // State for managing which expense is being edited

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingExpense) {
            try {
                const response = await axios.put(`http://localhost:5000/expenses/${editingExpense._id}`, editingExpense);
                if (response.status === 200) {
                    setEditingExpense(null); // Exit edit mode
                    fetchExpenses(); // Refresh the list
                    setNewExpense({ amount: '', description: '' }); // Reset the form for new entries
                } else {
                    console.error('Failed to update expense:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating expense:', error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/expenses', newExpense);
                if (response.status === 201 || response.status === 200) {
                    setNewExpense({ amount: '', description: '' }); // Reset form
                    fetchExpenses(); // Refresh the list
                } else {
                    console.error('Failed to add expense:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding expense:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingExpense) {
            setEditingExpense({ ...editingExpense, [name]: value });
        } else {
            setNewExpense({ ...newExpense, [name]: value });
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Amount:
                        <input type="number" name="amount" value={editingExpense ? editingExpense.amount : newExpense.amount} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={editingExpense ? editingExpense.description : newExpense.description} onChange={handleChange} />
                    </label>
                    <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
                </form>
            </div>
            <div style={{ width: '300px', height: '300px', margin: '20px auto' }}>
                <PieChart
                    data={expenses.map(expense => ({
                        title: expense.description,
                        value: parseFloat(expense.amount),
                        color: '#' + Math.floor(Math.random()*16777215).toString(16),
                    }))}
                    label={({ dataEntry }) => `${dataEntry.title}: ${Math.round(dataEntry.percentage)} %`}
                />
            </div>
            <div>
                <h3>Expenses</h3>
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense._id}>
                            {expense.description} - ${parseFloat(expense.amount).toFixed(2)}
                            <button onClick={() => handleEdit(expense)}>Edit</button>
                            <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
