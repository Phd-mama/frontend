"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import withAuth from '../utils/withAuth';
import { useState, useEffect } from "react";
import { FiUpload, FiEdit } from "react-icons/fi";

const AdminPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleImportCSV = () => {
        window.location.href = "/dashboardadmin/import";
    };

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
                <h1 className="text-3xl font-bold text-pink-700 mb-6">Admin Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Import Data Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Import Data</h2>
                        <p className="text-gray-600 mb-4 text-center">Import data Experts ke Database</p>
                        <button
                            onClick={handleImportCSV}
                            className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200"
                        >
                            <FiUpload size={20} />
                            <span>Import CSV</span>
                        </button>
                    </div>
                    
                    {/* Moderation Data Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Moderation</h2>
                        <p className="text-gray-600 mb-4 text-center">Moderasi dan konfirmasi status user</p>
                        <button
                            onClick={() => window.location.href = "/dashboardadmin/moderation"}
                            className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition duration-200"
                        >
                            <FiEdit size={20} />
                            <span>Go to Moderation</span>
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default withAuth(AdminPage, ['admin']);
