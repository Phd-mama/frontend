"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import withAuth from "../../utils/withAuth";
import { useEffect, useState } from "react";
import { Profile } from "../../types/types";
import ProfileEditForm from "../../components/Forms/ProfileEditForm";
import { ToastContainer, toast } from "react-toastify";
import { FaSort, FaSortUp, FaSortDown, FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ModerationPage: React.FC = () => {
    const [experts, setExperts] = useState<Profile[]>([]);
    const [filteredExperts, setFilteredExperts] = useState<Profile[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState<{ [key: number]: boolean }>({});
    const [editingExpertId, setEditingExpertId] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Pick<Profile, "name" | "user" | "status">; direction: "asc" | "desc" } | null>(null);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/");
                const data = await response.json();
                setExperts(data.map((expert: Profile) => ({
                    ...expert,
                    status: expert.status || "Pending",
                })));
                setFilteredExperts(data);
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
        try {
            const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/admin/expert/${userId}/update-status/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                toast.success("Status updated successfully!");
                window.location.reload();
            } else {
                console.error("Failed to update status:", await response.json());
                toast.error("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating status.");
        } finally {
            setIsUpdating((prev) => ({ ...prev, [userId]: false }));
        }
    };

    const handleEdit = (userId: number) => {
        setEditingExpertId(userId);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = experts.filter((expert) =>
            expert.name.toLowerCase().includes(value)
        );
        setFilteredExperts(filtered);
        setCurrentPage(1);
    };

    const handleSort = (key: keyof Pick<Profile, "name" | "user" | "status">) => {
        const direction = sortConfig?.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });

        const sorted = [...filteredExperts].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredExperts(sorted);
    };

    const getSortIcon = (key: keyof Pick<Profile, "name" | "user" | "status">) => {
        if (sortConfig?.key === key) {
            return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
        }
        return <FaSort />;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentExperts = filteredExperts.slice(indexOfFirstItem, indexOfLastItem);

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
                <ToastContainer />
                <h1 className="text-3xl font-bold text-pink-700 mb-6">Moderation Dashboard</h1>

                {/* Search */}
                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border px-4 py-2 rounded-lg w-1/3 shadow-sm focus:ring focus:ring-pink-300"
                    />
                </div>

                {/* Empty State */}
                {filteredExperts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <FaSearch className="text-pink-500 text-6xl mb-4" />
                        <p className="text-gray-600 text-xl">No results found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
                        <table className="w-full text-left table-auto">
                            <thead>
                                <tr>
                                    <th
                                        className="px-4 py-2 border-b cursor-pointer"
                                        onClick={() => handleSort("name")}
                                    >
                                        Name {getSortIcon("name")}
                                    </th>
                                    <th
                                        className="px-4 py-2 border-b cursor-pointer"
                                        onClick={() => handleSort("user")}
                                    >
                                        User ID {getSortIcon("user")}
                                    </th>
                                    <th
                                        className="px-4 py-2 border-b cursor-pointer"
                                        onClick={() => handleSort("status")}
                                    >
                                        Status {getSortIcon("status")}
                                    </th>
                                    <th className="px-4 py-2 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentExperts.map((expert) => (
                                    <tr key={expert.user} className="hover:bg-pink-50 transition duration-200">
                                        <td className="px-4 py-2 border-b">{expert.name}</td>
                                        <td className="px-4 py-2 border-b">{expert.user}</td>
                                        <td className="px-4 py-2 border-b">
                                            <span
                                                className={`text-sm ${
                                                    expert.status === "Confirmed" ? "text-green-600" : "text-yellow-600"
                                                }`}
                                            >
                                                {expert.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-b flex space-x-2">
                                            {isUpdating[expert.user] ? (
                                                <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-4 h-6 w-6"></div>
                                            ) : (
                                                <select
                                                    value={expert.status}
                                                    onChange={(e) => handleConfirm(expert.user, e.target.value)}
                                                    className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 focus:outline-none"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                </select>
                                            )}
                                            <button
                                                onClick={() => handleEdit(expert.user)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {filteredExperts.length > 0 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded ${
                                currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(filteredExperts.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === index + 1 ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredExperts.length / itemsPerPage)}
                            className={`px-4 py-2 rounded ${
                                currentPage === Math.ceil(filteredExperts.length / itemsPerPage)
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </main>

            {/* Modal for Editing */}
            {editingExpertId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <ProfileEditForm
                            userId={editingExpertId}
                            onClose={() => {
                                setEditingExpertId(null);
                                window.location.reload();
                            }}
                        />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default withAuth(ModerationPage, ["admin"]);
