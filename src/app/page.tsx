"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Profile } from "./types/types";  
import Card from "./components/Card"; 

const LandingPage: React.FC = () => {
  const [experts, setExperts] = useState<Profile[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/");
        const data = await response.json();
        setExperts(data.slice(0, 9).filter((expert: Profile) => expert.status === "Confirmed")); 
      } catch (error) {
        console.error("Error fetching experts data:", error);
      }
    };
    fetchExperts();
  }, []);

  const handleExplore = () => {
    router.push("/explore");
  };

  const handleJoinNow = () => {
    router.push("/login");
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Navbar />
      <header className="bg-gradient-to-br from-pink-500 to-purple-500 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Indonesia's PhD Experts</h1>
        <p className="text-lg font-medium">
          Connect with leading women experts across diverse fields.
        </p>
      </header>

      <section className="bg-gray-100 py-20 px-4 lg:px-20"> 
        <h2 className="text-3xl text-center font-semibold text-black mb-10">
          Find Indonesia's Leading PhD Woman Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> 
          {experts.map((expert) => (
            <Card key={expert.user} expert={expert} /> 
          ))}
        </div>
        <div className="text-center mt-8">
        <button
          className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
          onClick={handleExplore}
        >
          Explore More
        </button>
      </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
