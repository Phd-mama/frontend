"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-pink-700 mt-4 text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
};

const ResetPasswordContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [isValidToken, setIsValidToken] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    useEffect(() => {
        const tokenFromURL = searchParams.get("token");
        if (tokenFromURL) {
            setToken(tokenFromURL);
            validateToken(tokenFromURL);
        } else {
            router.push("/not-found");
        }
    }, [searchParams, router]);

    const validateToken = async (token: string) => {
        try {
            const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/validate-token/?token=${token}`);
            if (response.ok) {
                setIsValidToken(true);
            } else {
                router.push("/not-found");
            }
        } catch (error) {
            toast.error("Token validation failed!");
            router.push("/not-found");
        }
    };

    const handleResetPassword = async () => {
        if (password !== repeatPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/reset-password/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password, repeat_password: repeatPassword }),
            });

            if (response.ok) {
                toast.success("Password reset successful!");
                router.push("/login");
            } else {
                const data = await response.json();
                toast.error(data.error || "Something went wrong!");
            }
        } catch (error) {
            toast.error("Network error!");
        }
    };

    if (!isValidToken) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-pink-700">Reset Password</h2>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full border rounded p-2 mt-4"
                />
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full border rounded p-2 mt-4"
                />
                <button
                    onClick={handleResetPassword}
                    className="w-full bg-pink-600 text-white py-2 mt-4 rounded hover:bg-pink-700"
                >
                    Reset Password
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

const ResetPassword = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <ResetPasswordContent />
    </Suspense>
);

export default ResetPassword;
