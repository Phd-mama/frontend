"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const validateForm = () => {
    if (!fullName || !username || !email || !password || !repeatPassword) {
      toast.error("All fields are required!");
      return false;
    }
    if (password !== repeatPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name: fullName, username, email, password, repeat_password: repeatPassword }),
      });

      if (response.ok) {
        toast.success("Registration successful!");
        setTimeout(() => {
          router.push("/login");
        }, 2000); 
      } else {
        const errData = await response.json();
        toast.error(errData.error || "Registration failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-700">PhdMama Indonesia DB</h2>
        <p className="mt-4">Please fill your information to proceed</p>
        <form onSubmit={handleRegister} className="mt-4">
          <FormField
            label="Full Name"
            type="text"
            placeholder="Phdmama"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FormField
            label="Username"
            type="text"
            placeholder="Phdmama"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormField
            label="Email Address"
            type="email"
            placeholder="Phdmama@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormField
            label="Repeat Password"
            type="password"
            placeholder="********"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
