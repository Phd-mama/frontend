import { FaInstagram, FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const SocialMediaForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Social Media</h3>

      {/* Instagram */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaInstagram className="mr-2" /> Instagram:
        </label>
        <input
          type="text"
          name="instagram"
          value={formData.instagram || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaLinkedin className="mr-2" /> LinkedIn:
        </label>
        <input
          type="text"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>

      {/* Twitter */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaTwitter className="mr-2" /> Twitter:
        </label>
        <input
          type="text"
          name="twitter"
          value={formData.twitter || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>

      {/* Personal Website */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaGlobe className="mr-2" /> Personal Website:
        </label>
        <input
          type="text"
          name="personal_website"
          value={formData.personal_website || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;
