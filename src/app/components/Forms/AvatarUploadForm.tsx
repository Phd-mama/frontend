import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";

interface AvatarUploadFormProps {
  userId: number;
  onAvatarUploaded: (newAvatarUrl: string) => void;
}

const AvatarUploadForm: React.FC<AvatarUploadFormProps> = ({ userId, onAvatarUploaded }) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAvatarPreview(data.profile_picture || null);
        } else {
          console.error("Failed to fetch profile picture");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchAvatar();
  }, [userId]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setShowModal(true);
    }
  };

  const handleConfirmUpload = async () => {
    if (!newAvatar) return;

    const formData = new FormData();
    formData.append("profile_picture", newAvatar);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`https://puanpakar.cs.ui.ac.id/api/experts/${userId}/upload-avatar/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onAvatarUploaded(data.profile_picture);
        toast.success("Avatar uploaded successfully!");
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error("Error uploading avatar:", errorData);
        toast.error("Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Error uploading avatar.");
    } finally {
      setUploading(false);
      setNewAvatar(null);
    }
  };

  const handleCancelUpload = () => {
    setNewAvatar(null);
    setAvatarPreview(avatarPreview); 
    setShowModal(false);
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-gray-300">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Upload Avatar</h3>
      <div className="relative group flex flex-col items-center mb-6">
        {/* Avatar Preview */}
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="w-28 h-28 rounded-full object-cover shadow-lg border-2 border-gray-300"
          />
        ) : (
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border-2 border-gray-300">
            No Avatar
          </div>
        )}

        {/* Input File */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          id="avatarUploadInput"
        />

        {/* Hover Overlay */}
        <div className="absolute w-28 h-28 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-white text-sm font-bold">Change Avatar</span>
        </div>
      </div>

      {/* Modal for Confirmation */}
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
            className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-700 flex items-center"
          >
            {uploading ? <ClipLoader size={20} color={"#fff"} /> : "Upload Avatar"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUploadForm;
