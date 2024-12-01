"use client";

import { useEffect, useState } from "react";
import { Profile } from "../types/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShortInformationForm from "../components/Forms/ShortInformationForm";
import ExpertiseForm from "../components/Forms/ExpertiseForm";
import ProjectsForm from "../components/Forms/ProjectsForm";
import PublicationsForm from "../components/Forms/PublicationsForm";
import AwardsForm from "../components/Forms/AwardsForm";
import NewsForm from "../components/Forms/NewsForm";
import SocialMediaForm from "../components/Forms/SocialMediaForm";
import BioForm from "../components/Forms/BioForm";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Short Information");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!userId || !token) {
          toast.error("User not authenticated");
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
        setAvatarPreview(data.profile_picture || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB.");
        return;
      }
      setNewAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setShowModal(true);
    }
  };

  const handleConfirmUpload = async () => {
    if (!newAvatar) return;

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");

      const formData = new FormData();
      formData.append("profile_picture", newAvatar);

      const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/upload-avatar/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarPreview(data.profile_picture);
        toast.success("Avatar uploaded successfully");
        setShowModal(false);
        setNewAvatar(null);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const errorData = await response.json();
        console.error("Error uploading avatar:", errorData);
        toast.error("Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Error uploading avatar");
    }
  };

  const handleCancelUpload = () => {
    setNewAvatar(null);
    setAvatarPreview(profile?.profile_picture || null);
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("FormData before submit:", formData);

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

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
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
      case "Bio":
        return <BioForm formData={formData} setFormData={setFormData} />;
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
        {avatarPreview && (
          <div className="flex justify-center mb-4">
            <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
          </div>
        )}
        <div className="flex justify-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            id="avatarUpload"
          />
          <label
            htmlFor="avatarUpload"
            className="bg-pink-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-700"
          >
            Upload Avatar
          </label>
        </div>
        {profile?.status && (
          <div className="flex justify-center items-center mb-4">
            {profile.status === "Confirmed" ? (
              <div className="flex items-center space-x-2 text-green-600">
                <AiFillCheckCircle className="text-xl" />
                <span>Profile Verified</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-yellow-600">
                <AiFillExclamationCircle className="text-xl" />
                <span>Verification Pending</span>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center mb-4 space-x-2">
          {[
            "Short Information",
            "Bio",
            "Expertise",
            "Projects",
            "Publications",
            "Awards",
            "News",
            "Social Media",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === tab ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <Modal
          isOpen={showModal}
          onRequestClose={handleCancelUpload}
          contentLabel="Confirm Avatar Change"
          className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg border border-gray-300"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-700">Confirm Avatar Change</h2>
          <p className="mb-4 text-gray-600">Do you want to upload this new profile picture?</p>
          <div className="flex justify-center mb-4">
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="New Avatar Preview"
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCancelUpload}
              className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-500 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmUpload}
              className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700"
            >
              Upload Avatar
            </button>
          </div>
        </Modal>
        {renderTabContent()}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-pink-600 text-white py-2 px-6 rounded text-sm hover:bg-pink-700"
          >
            Update Profile
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
