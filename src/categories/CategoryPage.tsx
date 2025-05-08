import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = () => {
    fetch("https://budget-tracker-backend-1-7iom.onrender.com/api/categories/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.results)); // ✅ Fix here
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    fetch("https://budget-tracker-backend-1-7iom.onrender.com/api/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    }).then(() => {
      setNewCategory("");
      fetchCategories();
    });
  };

  const handleEdit = (id: number) => {
    fetch(`https://budget-tracker-backend-1-7iom.onrender.com/api/categories/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: editName }),
    }).then(() => {
      setEditCategoryId(null);
      fetchCategories();
    });
  };

  const handleDelete = (id: number) => {
    fetch(`https://budget-tracker-backend-1-7iom.onrender.com/api/categories/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => fetchCategories());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="mb-2 flex items-center gap-2">
            {editCategoryId === cat.id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleEdit(cat.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <button
                  onClick={() => {
                    setEditCategoryId(cat.id);
                    setEditName(cat.name);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
