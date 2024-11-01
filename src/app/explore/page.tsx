"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Expert } from "../types/expert"; 
import Card from "../components/Card";

const ExplorePage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const fetchExperts = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/`);
      const data = await response.json();
      const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
      setExperts(paginatedData);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
        </div>
      ) : (
        <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl text-center font-semibold text-black mb-10">
            Find Indonesia's Leading PhD Woman Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <Card key={expert.id} expert={expert} /> 
            ))}
          </div>
          <div className="pagination-controls flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              className={`px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700 text-lg font-semibold mt-1">{`Page ${currentPage}`}</span>
            <button
              onClick={handleNextPage}
              className={`px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all ${
                experts.length < pageSize ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={experts.length < pageSize}
            >
              Next
            </button>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ExplorePage;