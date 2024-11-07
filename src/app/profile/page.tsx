"use client"

import { useEffect, useState } from "react";
import { Profile } from "../types/types";
import Navbar from "../components/Navbar";
import ShortInformationForm from "../components/Forms/ShortInformationForm";
import ExpertiseForm from "../components/Forms/ExpertiseForm";
import ProjectsForm from "../components/Forms/ProjectsForm";
import PublicationsForm from "../components/Forms/PublicationsForm";
import AwardsForm from "../components/Forms/AwardsForm";
import NewsForm from "../components/Forms/NewsForm";
import SocialMediaForm from "../components/Forms/SocialMediaForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Short Information");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!userId || !token) {
          console.error("User not logged in");
          return;
        }

        const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data: Profile = await response.json();
        setProfile(data);
        setFormData(data);
      } catch (error) {
        toast.error("Failed to fetch profile");
        console.error("Failed to fetch profile", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        toast.success("Profile updated successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update profile: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Short Information":
        return <ShortInformationForm formData={formData} setFormData={setFormData} />;
      case "Expertise":
        return <ExpertiseForm formData={formData} setFormData={setFormData} />;
      case "Projects":
        return <ProjectsForm formData={formData} setFormData={setFormData} />;
      case "Publications":
        return <PublicationsForm formData={formData} setFormData={setFormData} />;
      case "Awards":
        return <AwardsForm formData={formData} setFormData={setFormData} />;
      case "News":
        return <NewsForm formData={formData} setFormData={setFormData} />;
      case "Social Media":
        return <SocialMediaForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">Edit Profile</h2>
        <div className="flex justify-center mb-4 space-x-2">
          {["Short Information", "Expertise", "Projects", "Publications", "Awards", "News", "Social Media"].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 text-sm rounded ${activeTab === tab ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-white p-6">{renderTabContent()}</div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-pink-600 text-white py-2 px-6 rounded text-sm hover:bg-pink-700"
          >
            Update Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
