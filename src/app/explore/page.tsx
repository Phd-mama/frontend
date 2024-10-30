"use client";

import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { Expert } from "../types/expert"; 



const ExplorePage: React.FC = () => {
  const [experts, setExperts] = useState<Expert[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await fetch("https://puanpakar.cs.ui.ac.id/api/experts/", {
          cache: "no-store",
        });
        if (!response.ok) {
          setError(`Failed to fetch data: ${response.statusText}`);
        } else {
          const data = await response.json();
          setExperts(data);
        }
      } catch (err: any) {
        setError("An error occurred while fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  if (loading) {
    // setTimeout(() => {}, 2000); 
    setTimeout(() => {}, 2000);
    return (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!experts || experts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <p className="text-gray-500">No experts found.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl text-center font-semibold text-black mb-10">
          Find Indonesia&apos;s Leading PhD Woman Experts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <Link
              key={expert.id}
              href={`/explore/${expert.id}`}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200 cursor-pointer min-h-[350px]"
            >
              <div>
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

                {/* Expertise badges */}
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
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExplorePage;
