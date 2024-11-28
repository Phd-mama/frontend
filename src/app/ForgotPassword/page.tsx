"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Email is required!");
            return;
        }

        setIsLoading(true); 
        try {
            const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/forgot-password/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast.success("Reset link sent to your email!");
            } else {
                const data = await response.json();
                toast.error(data.error || "Something went wrong!");
            }
        } catch (error) {
            toast.error("Network error!");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-pink-700">Forgot Password</h2>
                <p className="mt-2">Enter your email to reset your password.</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full border rounded p-2 mt-4"
                    disabled={isLoading} 
                />
                <button
                    onClick={handleForgotPassword}
                    className={`w-full py-2 mt-4 rounded text-white ${
                        isLoading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
                    }`}
                    disabled={isLoading} 
                >
                    {isLoading ? "Submitting..." : "Submit"} 
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
