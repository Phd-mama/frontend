"use client";

import { useState, useEffect } from "react";
import { Profile } from "../../types/types";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { BiUserCircle } from "react-icons/bi";
import { MdEmail, MdLocationOn, MdWeb } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function ExpertProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("About");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${id}`);
        const data = await res.json();

        setTimeout(() => {
          setProfile(data);
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        setLoading(false); 
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile found!</div>;
  }

  const renderSection = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Biography</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{profile.short_bio || "No bio available."}</p>
          </div>
        );
      case "Works":
        return (
          <div>
            {profile.selected_projects?.length ? (
              profile.selected_projects.map((work, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold">{work.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No works available</p>
            )}
          </div>
        );
      case "Publications":
        return (
          <div>
            {profile.selected_publications?.length ? (
              profile.selected_publications.map((pub, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold">{pub.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No publications available</p>
            )}
          </div>
        );
      case "Awards":
        return (
          <div>
            {profile.awards?.length ? (
              profile.awards.map((award, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold">{award.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No awards available</p>
            )}
          </div>
        );
      case "News":
        return (
          <div>
            {profile.news?.length ? (
              profile.news.map((news, idx) => (
                <div key={idx} className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold">{news.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No news available</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <header className="bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 shadow-md py-12 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <button
            className="absolute top-4 left-4 text-gray-700 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            <IoArrowBack className="text-2xl" />
          </button>
          {profile.profile_picture ? (
            <img
              src={`${profile.profile_picture}`}
              alt={profile.name}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-4"
            />
          ) : (
            <BiUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4" />
          )}

          <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
          <p className="text-lg text-gray-600 mt-2">
            {profile.position} at {profile.institution}
          </p>

          <ul className="mt-4 text-gray-700 space-y-2">
            <li className="flex justify-center items-center gap-2">
              <MdEmail className="text-gray-800" /> {profile.contact_info || "No email provided"}
            </li>
            <li className="flex justify-center items-center gap-2">
              <MdLocationOn className="text-gray-800" /> {profile.location || "Location not specified"}
            </li>
            <li className="flex justify-center items-center gap-2">
              <MdWeb className="text-gray-800" />
              {profile.personal_website ? (
                <a
                  href={profile.personal_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-700 hover:underline"
                >
                  {profile.personal_website}
                </a>
              ) : (
                "No website provided"
              )}
            </li>
          </ul>

          {profile.expertise?.length > 0 && (
            <div className="mt-4 flex justify-center flex-wrap gap-2">
              {profile.expertise.map((exp, idx) => (
                <span
                  key={idx}
                  className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                >
                  {exp.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-6 space-x-4">
            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 hover:text-pink-600 text-2xl" />
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-500 hover:text-blue-600 text-2xl" />
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-400 hover:text-blue-500 text-2xl" />
              </a>
            )}
          </div>
        </div>
      </header>

      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="container mx-auto flex space-x-6 justify-center py-4">
          {["About", "Works", "Publications", "Awards", "News"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === tab ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-pink-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="flex-grow container mx-auto py-6">{renderSection()}</main>

      <Footer />
    </div>
  );
}
