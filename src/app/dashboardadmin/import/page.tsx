"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import withAuth from '../../utils/withAuth';
import { useState } from 'react';
import { FiUpload } from "react-icons/fi";

const ImportPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a CSV file to upload!");
            return;
        }
        
        console.log(`Uploading ${selectedFile.name}...`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-bold text-pink-700 mb-6">Import Data</h1>
                
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload CSV File</h2>
                    <p className="text-gray-600 mb-6 text-center">Upload a CSV file to import expert data into the database.</p>
                    
                    <div className="flex flex-col items-center w-full">
                        <label className="w-full flex flex-col items-center cursor-pointer">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="flex flex-col items-center justify-center border-2 border-dashed border-pink-600 p-6 rounded-lg w-full text-center text-gray-600 hover:bg-pink-50 transition duration-200">
                                <FiUpload size={40} className="text-pink-600 mb-2" />
                                <span className="text-lg">Drag and drop your CSV file here, or click to select a file</span>
                            </div>
                        </label>
                        <button
                            onClick={handleUpload}
                            className="mt-6 flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-200"
                        >
                            <FiUpload size={20} />
                            <span>Upload CSV</span>
                        </button>
                    </div>

                    {selectedFile && (
                        <p className="text-gray-600 mt-4">Selected File: {selectedFile.name}</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default withAuth(ImportPage, ['admin']);
