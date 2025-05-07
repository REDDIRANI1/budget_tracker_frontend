// src/categories/CreateCategory.tsx
import { useForm } from "react-hook-form";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

type CategoryFormData = {
  name: string;
};

export default function CreateCategory() {
  const { register, handleSubmit } = useForm<CategoryFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await api.post("/categories/", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Category created!");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to create category.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Create Category</h2>
      <input {...register("name")} placeholder="Category Name" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">Create</button>
    </form>
  );
}
