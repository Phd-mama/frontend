"use client";

import { useEffect, useState } from "react";
import { Profile } from "../types/types";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Profile>>({});

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
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedInputChange = (field: keyof Profile, index: number, subField: string, value: string) => {
    const updatedField = [...(formData[field] as any[])];
    updatedField[index] = { ...updatedField[index], [subField]: value };
    setFormData({
      ...formData,
      [field]: updatedField,
    });
  };

  const handleAddField = (field: keyof Profile) => {
    let newItem;
    switch (field) {
      case "expertise":
        newItem = { name: "" };
        break;
      case "selected_projects":
      case "selected_publications":
        newItem = { title: "", description: "" };
        break;
      default:
        return;
    }

    setFormData({
      ...formData,
      [field]: [...(formData[field] as any[] || []), newItem],
    });
  };

  const handleDeleteField = (field: keyof Profile, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as any[])?.filter((_: any, i: number) => i !== index),
    });
  };

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
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-semibold">Full Name & Title:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Institution:</label>
              <input
                type="text"
                name="institution"
                value={formData.institution || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Position:</label>
              <input
                type="text"
                name="position"
                value={formData.position || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Twitter:</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Instagram:</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">LinkedIn:</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
              />
            </div>
          </div>

          <label className="block mb-2 font-semibold">Short Bio:</label>
          <textarea
            name="short_bio"
            value={formData.short_bio || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold">Education Background:</label>
          <textarea
            name="education_background"
            value={formData.education_background || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold">Personal Website:</label>
          <input
            type="text"
            name="personal_website"
            value={formData.personal_website || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold">News:</label>
          <textarea
            name="news"
            value={formData.news || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block mb-2 font-semibold">Awards:</label>
          <textarea
            name="awards"
            value={formData.awards || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Expertise */}
          <h3 className="text-xl font-bold mt-6">Expertise</h3>
          <ul>
            {formData.expertise && formData.expertise.length > 0 ? (
              formData.expertise.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) => handleNestedInputChange("expertise", index, "name", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <button onClick={() => handleDeleteField("expertise", index)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No expertise available</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => handleAddField("expertise")}
            className="text-red-500 flex items-center space-x-2"
          >
            <FaPlus /> Add Expertise
          </button>

          {/* Projects */}
          <h3 className="text-xl font-bold mt-6">Projects</h3>
          <ul>
            {formData.selected_projects && formData.selected_projects.length > 0 ? (
              formData.selected_projects.map((project, index) => (
                <li key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => handleNestedInputChange("selected_projects", index, "title", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <input
                    type="text"
                    value={project.description || ""}
                    onChange={(e) => handleNestedInputChange("selected_projects", index, "description", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <button onClick={() => handleDeleteField("selected_projects", index)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No projects available</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => handleAddField("selected_projects")}
            className="text-red-500 flex items-center space-x-2"
          >
            <FaPlus /> Add Project
          </button>

          {/* Publications */}
          <h3 className="text-xl font-bold mt-6">Publications</h3>
          <ul>
            {formData.selected_publications && formData.selected_publications.length > 0 ? (
              formData.selected_publications.map((publication, index) => (
                <li key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={publication.title || ""}
                    onChange={(e) => handleNestedInputChange("selected_publications", index, "title", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <input
                    type="text"
                    value={publication.description || ""}
                    onChange={(e) => handleNestedInputChange("selected_publications", index, "description", e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                  <button onClick={() => handleDeleteField("selected_publications", index)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No publications available</li>
            )}
          </ul>
          <button
            type="button"
            onClick={() => handleAddField("selected_publications")}
            className="text-red-500 flex items-center space-x-2"
          >
            <FaPlus /> Add Publication
          </button>

          <button type="submit" className="mt-6 bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
