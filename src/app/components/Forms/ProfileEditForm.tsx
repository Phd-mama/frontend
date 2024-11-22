import React, { useEffect, useState } from "react";
import { Profile } from "../../types/types";
import AwardsForm from "./AwardsForm";
import BioForm from "./BioForm";
import ExpertiseForm from "./ExpertiseForm";
import NewsForm from "./NewsForm";
import ProjectsForm from "./ProjectsForm";
import PublicationsForm from "./PublicationsForm";
import ShortInformationForm from "./ShortInformationForm";
import SocialMediaForm from "./SocialMediaForm";
import { toast } from "react-toastify";

interface Props {
    userId: number;
    onClose: () => void;
}

const ProfileEditForm: React.FC<Props> = ({ userId, onClose }) => {
    const [formData, setFormData] = useState<Partial<Profile>>({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Short Information");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                toast.error("Failed to fetch profile data.");
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Data to submit:", formData); 

        try {
            const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const updatedProfile = await response.json();
                setFormData(updatedProfile);
                toast.success("Profile updated successfully!");
                onClose(); 
            } else {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                toast.error(`Failed to update profile: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile.");
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
            <div className="flex justify-center items-center">
                <div className="border-t-transparent border-solid animate-spin rounded-full border-pink-500 border-8 h-16 w-16"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-pink-600">Edit Profile</h2>
            <div className="flex space-x-2 mb-4 overflow-x-auto whitespace-nowrap">
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
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded ${
                            activeTab === tab ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700"
                        } text-sm`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>{renderTabContent()}</div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500 mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditForm;
