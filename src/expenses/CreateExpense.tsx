// src/expenses/CreateExpense.tsx
import { useForm } from "react-hook-form";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type ExpenseForm = {
  name: string;
  amount: number;
  date: string;
  category: number;
};

export default function CreateExpense() {
  const { register, handleSubmit } = useForm<ExpenseForm>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get("/categories/").then((res) => setCategories(res.data));
  }, []);

  const onSubmit = async (data: ExpenseForm) => {
    try {
      await api.post("/expenses/", data);
      alert("Expense created!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create expense.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 mt-10">
      <h2 className="text-xl font-bold">Add Expense</h2>
      <input {...register("name")} placeholder="Expense Name" className="w-full p-2 border rounded" />
      <input type="number" step="0.01" {...register("amount")} placeholder="Amount" className="w-full p-2 border rounded" />
      <input type="date" {...register("date")} className="w-full p-2 border rounded" />
      <select {...register("category")} className="w-full p-2 border rounded">
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Create</button>
    </form>
  );
}
