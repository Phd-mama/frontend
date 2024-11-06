"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Expert } from "../types/expert"; 
import Card from "../components/Card";
import { FaSearch, FaExclamationCircle } from 'react-icons/fa';

const ExplorePage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const pageSize = 9;

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/`);
      const data = await response.json();
      setExperts(data);
      setFilteredExperts(data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleFilter = async () => {
    setSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filtered = experts.filter((expert) =>
      (selectedCountry ? expert.location.includes(selectedCountry) : true) &&
      (selectedExpertise ? expert.expertise.includes(selectedExpertise) : true) &&
      (searchName ? expert.name.toLowerCase().includes(searchName.toLowerCase()) : true)
    );
    setFilteredExperts(filtered);
    setCurrentPage(1);
    setSearching(false);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const uniqueCountries = Array.from(new Set(experts.map((expert) => expert.location)));
  const uniqueExpertise = Array.from(new Set(experts.flatMap((expert) => expert.expertise)));

  const paginatedExperts = filteredExperts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
        </div>
      ) : (
        <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20 flex-1">
          <h2 className="text-3xl text-center font-semibold text-black mb-10">
            Find Indonesia's Leading PhD Woman Experts
          </h2>

          {/* Filter Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="">Select Country</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="">Select Expertise</option>
              {uniqueExpertise.map((expertise) => (
                <option key={expertise} value={expertise}>{expertise}</option>
              ))}
            </select>
            <button
              onClick={handleFilter}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all flex items-center space-x-2"
            >
              <FaSearch /> <span>Search</span>
            </button>
          </div>

          {/* Loading Spinner for Search */}
          {searching ? (
            <div className="flex justify-center items-center min-h-screen">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-12 w-12"></div>
            </div>
          ) : paginatedExperts.length > 0 ? (
            <div>
              {/* Experts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedExperts.map((expert) => (
                  <Card key={expert.id} expert={expert} />
                ))}
              </div>
              {/* Pagination Controls */}
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
                    paginatedExperts.length < pageSize ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={paginatedExperts.length < pageSize}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[40vh]">
              <FaExclamationCircle className="text-pink-500 text-4xl mb-4" />
              <p className="text-lg text-gray-700">No results found. Please adjust your search criteria.</p>
            </div>
          )}
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default ExplorePage;
