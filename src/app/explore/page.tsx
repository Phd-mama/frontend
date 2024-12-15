"use client";

import Autocomplete from "../components/Autocomplete"; 
import { Modal, ModalHeader, ModalBody, ModalFooter } from "../components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Profile } from "../types/types";
import Card from "../components/Card";
import { FaSearch, FaUndo } from "react-icons/fa";


const ExplorePage: React.FC = () => {
  const [experts, setExperts] = useState<Profile[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
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

      const confirmedExperts = data
        .filter((expert: Profile) => expert.status === "Confirmed")
        .map((expert: Profile) => ({
          ...expert,
          photo_url: expert.profile_picture || null,
        }));

      setTimeout(() => {
        setExperts(confirmedExperts);
        setFilteredExperts(confirmedExperts);
        setLoading(false); 
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const handleFilter = () => {
    const filtered = experts.filter((expert) =>
      (selectedCountry ? expert.location?.includes(selectedCountry) : true) &&
      (selectedExpertise ? expert.expertise?.some((e) => e.name === selectedExpertise) : true) &&
      (searchName ? expert.name.toLowerCase().includes(searchName.toLowerCase()) : true)
    );
    setFilteredExperts(filtered);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setSelectedCountry("");
    setSelectedExpertise("");
    setSearchName("");
    setFilteredExperts(experts);
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const uniqueCountries = Array.from(
    new Set(experts.map((expert) => expert.location).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const uniqueExpertise = Array.from(
    new Set(experts.flatMap((expert) => expert.expertise.map((e) => e.name)).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const paginatedExperts = filteredExperts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20 flex-1">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Filter and Explore
        </h2>

        {/* Filter Controls */}
        {/* Name search */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Autocomplete
            options={experts.map(expert => expert.name)}
            value={searchName}
            onChange={(value) => {
              setSearchName(value);
            }}
            placeholder="Search by Name"
            className="w-full max-w-xs"
            type="input"
          />


          {/* Country Dropdown with Search */}
          <Autocomplete
            options={uniqueCountries}
            value={selectedCountry}
            onChange={(value) => {
              setSelectedCountry(value);
            }}
            placeholder="Select Country"
            className="w-full max-w-xs"
            type="select"
          />
          
          {/* Expertise Dropdown with Search */}
          <Autocomplete
            options={uniqueExpertise}
            value={selectedExpertise}
            onChange={(value) => {
              setSelectedExpertise(value);
            }}
            placeholder="Select Expertise"
            className="w-full max-w-xs"
            type="select"
          />

          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition-all flex items-center space-x-2 focus:ring-2 focus:ring-pink-400"
          >
            <FaSearch /> <span>Search</span>
          </button>
          <button
            onClick={handleResetFilter}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all flex items-center space-x-2 focus:ring-2 focus:ring-gray-400"
          >
            <FaUndo /> <span>Reset</span>
          </button>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin border-t-transparent border-solid rounded-full border-pink-500 border-4 h-12 w-12"></div>
          </div>
        ) : paginatedExperts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedExperts.map((expert) => (
                <Card key={expert.user} expert={expert} />
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
              <span className="text-gray-700 text-lg font-semibold">{`Page ${currentPage}`}</span>
              <button
                onClick={handleNextPage}
                className={`px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all ${
                  currentPage * pageSize >= filteredExperts.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentPage * pageSize >= filteredExperts.length}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <FaSearch className="text-pink-500 text-4xl mb-4" />
            <p className="text-lg text-gray-700">No results found. Try adjusting your filters.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ExplorePage;
