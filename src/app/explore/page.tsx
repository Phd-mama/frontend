import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Expert } from "../types/expert";

interface ExplorePageProps {
  experts: Expert[] | null;
  error?: string;
}

export default async function ExplorePage() {
  let experts: Expert[] | null = null;
  let error: string | undefined;

  try {
    const response = await fetch("http://127.0.0.1:8000/api/experts/", {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      error = `Failed to fetch data: ${response.statusText}`;
    } else {
      experts = await response.json();
    }
  } catch (err: any) {
    console.error("Error fetching experts data:", err.message);
    error = "An error occurred while fetching data. Please try again later.";
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

      {/* Search Bar */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Search bar, tags, and affiliation inputs */}
          </div>
        </div>
      </section>

      {/* Expert Cards */}
      <section className="bg-gray-50 py-16 flex-grow">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
          {experts.map((expert) => (
            <Link
              key={expert.id}
              href={`/explore/${expert.id}`}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300 ease-in-out border border-gray-200"
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
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
