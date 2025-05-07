import { useEffect, useState } from "react";
import api from "../lib/axios";

type Expense = {
  id: number;
  name: string;
  amount: string;
  date: string;
  category: number;
};

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get("/expenses/");
        setExpenses(response.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-4 border rounded shadow">
            <div className="font-semibold">{expense.name}</div>
            <div>Amount: ₹{expense.amount}</div>
            <div>Date: {expense.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
