import { FaUniversity, FaLocationArrow, FaBriefcase, FaEnvelope } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ShortInformationForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const [avatar, setAvatar] = useState<string | null>(formData.avatar || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        setFormData({
          ...formData,
          avatar: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Short Information</h3>
      <div className="flex flex-col items-center mb-6">
        {avatar ? (
          <img src={avatar} alt="User Avatar" className="w-28 h-28 rounded-full object-cover mb-2" />
        ) : (
          <BiUserCircle className="w-28 h-28 text-gray-400 mb-2" />
        )}
        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatarUpload" />
        <label htmlFor="avatarUpload" className="text-pink-600 cursor-pointer underline">
          Upload Image
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name & Title */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaBriefcase className="mr-2" /> Full Name & Title:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaEnvelope className="mr-2" /> Contact Info:
          </label>
          <input
            type="email"
            name="contact_info"
            value={formData.contact_info || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>

        {/* Institution */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaUniversity className="mr-2" /> Institution:
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>

        {/* Position */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaBriefcase className="mr-2" /> Position:
          </label>
          <input
            type="text"
            name="position"
            value={formData.position || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>

        {/* Education Background */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaUniversity className="mr-2" /> Education Background:
          </label>
          <textarea
            name="education_background"
            value={formData.education_background || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 font-semibold text-pink-600 flex items-center">
            <FaLocationArrow className="mr-2" /> Location:
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default ShortInformationForm;
