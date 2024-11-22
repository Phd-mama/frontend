"use client";

import { BiUserCircle } from "react-icons/bi";
import { MdAnnouncement, MdBook, MdEmail, MdEmojiEvents, MdLocationOn, MdWeb, MdWork } from "react-icons/md";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; 
import { Profile } from "../../types/types"; 
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ConversationLogo from "../../public/assets/images/the_conversations.png"
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ExpertProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${id}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
        }
        
        const data: Profile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        await new Promise(resolve => setTimeout(resolve, 1000));
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-black">Profile not found</h1>
            <p className="text-gray-700 mt-4">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-pink-50 py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 border-2 border-pink-300">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Left Side: Avatar and Bio */}
            <div className="flex-1 flex flex-col items-center md:items-center mb-4 md:mb-0">
              {profile?.photo_url ? (
                <img 
                  src={profile.photo_url} 
                  alt={profile.name} 
                  className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-gradient-to-r from-pink-500 to-purple-500"
                />
              ) : (
                <BiUserCircle className="w-48 h-48 text-gray-400 mb-4" />
              )}
              <p className="text-black text-center text-base md:text-lg leading-relaxed max-w-sm">
                {profile?.short_bio}
              </p>
            </div>

            {/* Right Side: Name, Position, Contact, Socials */}
            <div className="flex-1 md:pl-8 flex flex-col items-center md:items-start">
              <h1 className="text-4xl font-bold text-black hover:text-pink-700 transition-colors text-center md:text-left mb-2">
                {profile?.name}
              </h1>
              <p className="text-lg text-black mb-4 text-center md:text-left">
                {profile?.position} at {profile?.institution}
              </p>

              {/* Personal Information */}
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center gap-2 text-black">
                  <MdEmail className="text-black" /> <strong>Email:</strong> {profile?.contact_info}
                </li>
                <li className="flex items-center gap-2 text-black">
                  <MdLocationOn className="text-black" /> <strong>Location:</strong> {profile?.location || 'Not specified'}
                </li>
                <li className="flex items-center gap-2 text-black">
                  <MdWeb className="text-black" /> 
                  <strong>Website:</strong>
                    {profile?.personal_website ? (
                      <a href={profile.personal_website} target="_blank" rel="noopener noreferrer" className="text-black ml-1 hover:underline">
                      {profile.personal_website}
                      </a>
                    ) : (
                      "No Website"
                    )}
                </li>
              </ul>

              {/* Expertise badges */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {profile?.expertise.map((exp) => (
                  <span 
                    key={exp.id} 
                    className="inline-block bg-pink-200 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-md mb-2"
                  >
                    {exp.name}
                  </span>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex space-x-4 mt-6">
                {profile?.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={24} className="text-pink-500 hover:text-red-500 transition-colors" />
                  </a>
                )}
                {profile?.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} className="text-blue-700 hover:text-blue-700 transition-colors" />
                  </a>
                )}
                {profile?.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} className="text-blue-500 hover:text-blue-400 transition-colors" />
                  </a>
                )}
                {profile?.the_conversation && (
                    <a href={profile.the_conversation} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-gray-500 text-xl">
                      <Image src={ConversationLogo} alt="The Conversation Indonesia" width={24} height={24} />
                    </a>
                )}
              </div>
            </div>
          </div>
          {/* Selected Projects */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-black border-b-2 border-pink-300 pb-2 flex items-center gap-2">
              <MdWork /> Selected Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {profile && profile.selected_projects && profile.selected_projects.length > 0 ? (
                profile.selected_projects.map((project, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-black">{project.title}</h3>
                    <p className="text-black">{project.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No projects available</p>
              )}
            </div>
          </div>

          {/* Selected Publications */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-black border-b-2 border-pink-300 pb-2 flex items-center gap-2">
              <MdBook /> Selected Publications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {profile && profile.selected_publications && profile.selected_publications.length > 0 ? (
                profile.selected_publications.map((publication, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-black">{publication.title}</h3>
                    <p className="text-black">{publication.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No publications available</p>
              )}
            </div>
          </div>

          {/* Awards */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-black border-b-2 border-pink-300 pb-2 flex items-center gap-2">
              <MdEmojiEvents /> Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {profile && profile.awards && profile.awards.length > 0 ? (
                profile.awards.map((award, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-black">Award {idx + 1}</h3>
                    <p className="text-black">{award.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No awards available</p>
              )}
            </div>
          </div>

          {/* News */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-black border-b-2 border-pink-300 pb-2 flex items-center gap-2">
              <MdAnnouncement /> News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {profile && profile.news && profile.news.length > 0 ? (
                profile.news.map((newsItem, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-black">News {idx + 1}</h3>
                    <p className="text-black">{newsItem.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-2">No news available</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
