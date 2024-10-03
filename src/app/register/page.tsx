"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField"; 

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === repeatPassword) {
      console.log({ fullName, email, password });
      router.push("/login");
    } else {
      alert("Password tidak sesuai");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-500">PhdMama Indonesia DB</h2>
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
          <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
