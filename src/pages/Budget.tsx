// src/budget/BudgetSummary.tsx
import { useEffect, useState } from 'react';
import api from '../lib/axios';

type Budget = {
  id: number;
  total_budget: string;
};

type Expense = {
  amount: string;
};

export default function BudgetSummary() {
  const [budget, setBudget] = useState<Budget | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newBudget, setNewBudget] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetRes = await api.get('/budgets/');
        setBudget(budgetRes.data);
        setNewBudget(budgetRes.data.total_budget);

        const expensesRes = await api.get('/expenses/');
        setExpenses(expensesRes.data);
      } catch (error) {
        console.error('Error fetching budget summary:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!budget) return;

    try {
      const res = await api.put(`/budgets/${budget.id}/`, {
        total_budget: newBudget,
      });
      setBudget(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update budget:', error);
    }
  };

  const totalSpent = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  const remaining = budget ? parseFloat(budget.total_budget) - totalSpent : 0;

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-lg mt-8 space-y-4">
      <h2 className="text-xl font-bold">Budget Summary</h2>

      {budget ? (
        <>
          {isEditing ? (
            <div className="space-y-2">
              <label className="block font-medium">Total Budget</label>
              <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Total Budget:</strong> ₹{budget.total_budget}</p>
              <p><strong>Total Spent:</strong> ₹{totalSpent.toFixed(2)}</p>
              <p><strong>Remaining:</strong> ₹{remaining.toFixed(2)}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Edit Budget
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading budget...</p>
      )}
    </div>
  );
}
