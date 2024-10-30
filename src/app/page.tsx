"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Expert } from "./types/expert"; 

const LandingPage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/");
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error("Error fetching experts data:", error);
      }
    };
    fetchExperts();
  }, []);

  const handleJoinUs = () => {
    router.push("/login");
  };
  const handleExplore = () => {
    router.push("/explore");
  };

  const handleCardClick = (id: number) => {
    router.push(`/explore/${id}`);
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Navbar />
      <header className="bg-red-500 py-20 text-center">
        <h1 className="text-3xl font-bold text-white">
          EMPOWERING KNOWLEDGE. CONNECTING EXPERTS
        </h1>
        <div className="mt-8">
          <button
            className="bg-black text-white text-md py-2 px-4 rounded-2xl hover:bg-gray-800 mx-2"
            onClick={handleJoinUs}
          >
            JOIN US
          </button>
          <button
            className="bg-white text-black text-md py-2 px-4 rounded-2xl hover:bg-gray-200 mx-2"
            onClick={handleExplore}
          >
            Explore Experts
          </button>
        </div>
      </header>

      <section className="bg-gray-100 py-20 px-4 lg:px-20"> 
  <h2 className="text-3xl text-center font-semibold text-black mb-10">
    Find Indonesia&apos;s Leading PhD Woman Experts
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> 
    {experts.map((expert) => (
      <div
        key={expert.id}
        onClick={() => handleCardClick(expert.id)}  
        className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      >
        {expert.photo_url ? (
          <Image
            src={expert.photo_url}
            alt={expert.name}
            width={120}
            height={120}
            className="mx-auto rounded-full mb-4"
          />
        ) : (
          <BiUserCircle className="mx-auto w-28 h-28 text-gray-400 mb-4" />
        )}
        <h3 className="text-2xl font-medium text-gray-800">
          {expert.name}
        </h3>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {(Array.isArray(expert.expertise) ? expert.expertise : [expert.expertise])
            .filter(Boolean)
            .slice(0, 3)
            .map((exp: string | { name: string }, index: number) => (
              <span 
                key={index} 
                className="inline-block bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md"
              >
                {typeof exp === 'string' ? exp : exp.name}
              </span>
            ))
          }
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {expert.bio ? (expert.bio.length > 50 ? `${expert.bio.slice(0, 50)}...` : expert.bio) : "No bio available"}
        </p>

        <div className="flex justify-center space-x-6 mt-6">
          <a
            href={expert.instagram || "https://instagram.com"}
            className="text-gray-500 hover:text-pink-500 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href={expert.linkedin || "https://linkedin.com"}
            className="text-gray-500 hover:text-blue-700 text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href={expert.twitter || "https://twitter.com"}
            className="text-gray-500 hover:text-blue-500 text-xl"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    ))}
  </div>
</section>
<Footer/>
    </div>
  );
};

export default LandingPage;
