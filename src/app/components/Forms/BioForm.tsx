import { FaInfoCircle } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BioForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Bio</h3>
      <div>
        <label className="mb-2 font-semibold text-pink-600 flex items-center">
          <FaInfoCircle className="mr-2" /> Bio:
        </label>
        <textarea
          name="short_bio" 
          value={formData.short_bio || ""}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border border-black rounded-lg shadow-inner"
        />
      </div>
    </div>
  );
};

export default BioForm;
