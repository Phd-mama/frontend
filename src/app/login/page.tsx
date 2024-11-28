"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      toast.info("You are already logged in! Redirecting...");
      setTimeout(() => {
        router.push(role === "admin" ? "/dashboardadmin" : "/explore");
      }, 1500);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json();

        if (data && data.user) {
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user.id.toString());
          localStorage.setItem("role", data.user.role);

          toast.success("Login successful!");
          setTimeout(() => {
            router.push(data.user.role === "admin" ? "/dashboardadmin" : "/explore");
          }, 2000);
        } else {
          throw new Error("Invalid response structure");
        }
      } else {
        const errData = await response.json();
        toast.error(errData.error || "Login failed!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-pink-700">PhdMama Indonesia DB</h2>
        <p className="mt-4">Welcome back! Please login to your account.</p>
        <form onSubmit={handleLogin} className="mt-4">
          <FormField
            label="Username"
            type="text"
            placeholder="Phdmama"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
            Login
          </button>
          <div className="mt-4 flex justify-between">
            <a href="/register" className="text-sm text-pink-700">
              Sign Up
            </a>
            <a href="/ForgotPassword" className="text-sm text-pink-700">
              Forgot Password
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
