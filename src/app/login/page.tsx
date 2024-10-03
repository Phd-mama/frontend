"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField"; 

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    router.push("/explore");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-500">PhdMama Indonesia DB</h2>
        <p className="mt-4">Welcome back! Please login to your account.</p>
        <form onSubmit={handleLogin} className="mt-4">
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
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <a href="/forgot-password" className="text-sm text-red-500">
              Forgot Password?
            </a>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700">
            Login
          </button>
          <div className="mt-4 flex justify-between">
            <a href="/register" className="text-sm text-red-500">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
