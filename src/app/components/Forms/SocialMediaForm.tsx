import { FaInstagram, FaTwitter, FaLinkedin, FaGlobe, FaGoogle } from "react-icons/fa";
import { SiOrcid } from "react-icons/si";
import Image from "next/image"; 
import ConversationLogo from "../../public/assets/images/the_conversations.png";

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

      {/* Google Scholar */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaGoogle className="mr-2" /> Google Scholar:
        </label>
        <input
          type="text"
          name="google_scholar"
          value={formData.google_scholar || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>

      {/* ORCID */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <SiOrcid className="mr-2" /> ORCID:
        </label>
        <input
          type="text"
          name="orcid"
          value={formData.orcid || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>

      {/* Conversation Indonesia */}
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <Image
            src={ConversationLogo}
            alt="Conversation Logo"
            width={24} 
            height={24} 
            className="mr-2"
          />
          Conversation Indonesia:
        </label>
        <input
          type="text"
          name="conversation_indonesia"
          value={formData.conversation_indonesia || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;
