"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import withAuth from '../../utils/withAuth';
import { useEffect, useState } from 'react';
import { Profile } from '../../types/types';

const ModerationPage: React.FC = () => {
    const [experts, setExperts] = useState<Profile[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState<{ [key: number]: boolean }>({});
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/");
                const data = await response.json();
                setExperts(data.map((expert: Profile) => ({
                    ...expert,
                    status: expert.status || "Pending"
                })));
            } catch (error) {
                console.error("Error fetching experts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchExperts();
    }, []);

    const handleConfirm = async (userId: number, status: string) => {
        setIsUpdating((prev) => ({ ...prev, [userId]: true }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
            const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/admin/expert/${userId}/update-status/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                setExperts((prevExperts) =>
                    prevExperts.map((expert) =>
                        expert.user === userId ? { ...expert, status } : expert
                    )
                );
            } else {
                console.error("Failed to update status:", await response.json());
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setIsUpdating((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentExperts = experts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-bold text-pink-700 mb-6">Moderation Dashboard</h1>

                <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">User ID</th>
                                <th className="px-4 py-2 border-b">Status</th>
                                <th className="px-4 py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentExperts.map((expert) => (
                                <tr key={expert.user} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b">{expert.name}</td>
                                    <td className="px-4 py-2 border-b">{expert.user}</td>
                                    <td className="px-4 py-2 border-b">
                                        <span className={`text-sm ${expert.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                                            {expert.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border-b">
                                        {isUpdating[expert.user] ? (
                                            <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-4 h-6 w-6"></div>
                                        ) : (
                                            <select
                                                value={expert.status}
                                                onChange={(e) => handleConfirm(expert.user, e.target.value)}
                                                className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition duration-200"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: Math.ceil(experts.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(experts.length / itemsPerPage)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === Math.ceil(experts.length / itemsPerPage) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700"}`}
                    >
                        Next
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default withAuth(ModerationPage, ['admin']);
