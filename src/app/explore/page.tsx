"use client";

import Navbar from "../components/Navbar";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Expert } from "../types/expert";

const ExplorePage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState("");
  const [afiliasi, setAfiliasi] = useState("");

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("/api/experts");
        const data = await response.json();
        setExperts(data);
      } catch (error) {
        console.error("Error fetching experts data:", error);
      }
    };
    fetchExperts();
  }, []);

  const filteredExperts = experts.filter((expert) => {
    return (
      (searchTerm === "" || expert.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (tags === "" || expert.expertise.toLowerCase().includes(tags.toLowerCase())) &&
      (afiliasi === "" || expert.bio.toLowerCase().includes(afiliasi.toLowerCase()))
    );
  });

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Navbar />

      {/* Search Bar */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by tags"
              className="w-full md:w-1/4 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition-all"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by affiliation"
              className="w-full md:w-1/4 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition-all"
              value={afiliasi}
              onChange={(e) => setAfiliasi(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Expert Cards */}
      <section className="bg-gray-50 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200"
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
                <h3 className="text-2xl font-medium text-gray-900 mb-2">
                  {expert.name}
                </h3>
                <p className="text-gray-600 mb-2">{expert.expertise}</p>
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
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No experts found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
