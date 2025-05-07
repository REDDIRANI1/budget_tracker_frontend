// src/components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
    >
      Logout
    </button>
  );
}
