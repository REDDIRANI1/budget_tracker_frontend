import { useForm } from "react-hook-form";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await api.post("/register/", data);
      alert("Registered successfully!");
      navigate("/login");
    } catch (error: any) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <input {...register("username")} placeholder="Username" className="w-full p-2 border rounded" />
      <input {...register("email")} placeholder="Email" type="email" className="w-full p-2 border rounded" />
      <input {...register("password")} placeholder="Password" type="password" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
    </form>
  );
}
