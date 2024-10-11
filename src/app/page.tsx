"use client";

import Navbar from "./components/Navbar";
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
        const response = await fetch("http://127.0.0.1:8000/api/experts/");
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

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Navbar />
      <header className="bg-red-500 py-20 text-center">
        <h1 className="text-3xl font-bold text-white">
          EMPOWERING KNOWLEDGE. CONNECTING EXPERTS
        </h1>
        <button
          className="mt-8 bg-black text-white text-md py-2 px-4 rounded-2xl hover:bg-gray-800"
          onClick={handleJoinUs}
        >
          JOIN US
        </button>
      </header>

      <section className="bg-gray-100 py-20">
        <h2 className="text-3xl text-center font-semibold text-black mb-10">
          Find Indonesia&apos;s Leading PhD Woman Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-3 md:px-12">
          {experts.map((expert, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300 ease-in-out"
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
              <p className="text-gray-600">{expert.expertise}</p>
              <p className="text-sm text-gray-500">{expert.bio}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href={expert.instagram || "https://instagram.com"}
                  className="text-gray-500 hover:text-pink-500"
                >
                  <FaInstagram />
                </a>
                <a
                  href={expert.linkedin || "https://linkedin.com"}
                  className="text-gray-500 hover:text-blue-700"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={expert.twitter || "https://twitter.com"}
                  className="text-gray-500 hover:text-blue-500"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
