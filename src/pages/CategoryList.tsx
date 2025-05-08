// src/categories/CategoryList.tsx
import { useEffect, useState } from "react";
import api from "../lib/axios";

type Category = {
  id: number;
  name: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Extract the array of results from paginated response
        setCategories(res.data.results);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="p-2 border rounded">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
