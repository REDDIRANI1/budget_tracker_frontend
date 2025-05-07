// src/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import api from "../lib/axios";

type Expense = {
  id: number;
  name: string;
  amount: string;
  date: string;
  category: number;
};

type Category = {
  id: number;
  name: string;
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({ category: "", amount: "", date: "" });

  const fetchExpenses = async () => {
    try {
      const params = new URLSearchParams(filters as any).toString();
      const res = await api.get(`/expenses/?${params}`);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <select
          className="p-2 border rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="p-2 border rounded"
          placeholder="Filter by Amount"
          value={filters.amount}
          onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
        />

        <input
          type="date"
          className="p-2 border rounded"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </div>

      <table className="w-full border mt-4 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Category ID</th>
          </tr>
        </thead>
        <tbody>
  {expenses.map((exp) => {
    const categoryName = categories.find(cat => cat.id === exp.category)?.name || "Unknown";
    return (
      <tr key={exp.id}>
        <td className="p-2 border">{exp.name}</td>
        <td className="p-2 border">{exp.amount}</td>
        <td className="p-2 border">{exp.date}</td>
        <td className="p-2 border">{categoryName}</td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
}
