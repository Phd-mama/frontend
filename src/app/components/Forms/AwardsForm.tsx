import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const AwardsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (index: number, value: string) => {
    const updatedAwards = [...(formData.awards || [])];
    updatedAwards[index] = { name: value }; 
    setFormData({ ...formData, awards: updatedAwards });
  };

  const handleAddAward = () => {
    setFormData({
      ...formData,
      awards: [...(formData.awards || []), { name: "" }],
    });
  };

  const handleDeleteAward = (index: number) => {
    setFormData({
      ...formData,
      awards: (formData.awards || []).filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Awards</h3>
      <ul>
        {formData.awards && formData.awards.length > 0 ? (
          formData.awards.map((award: any, index: number) => (
            <li
              key={index}
              className="flex items-center space-x-2 mb-4 border border-pink-600 p-2 rounded-lg"
            >
              <input
                type="text"
                placeholder="Award Name"
                value={award.name || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button
                type="button" 
                onClick={() => handleDeleteAward(index)}
                className="hover:text-pink-600"
              >
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No awards available</li>
        )}
      </ul>
      <button
        type="button"
        onClick={handleAddAward}
        className="text-pink-600 flex items-center space-x-2 mt-2"
      >
        <FaPlus /> <span>Add Award</span>
      </button>
    </div>
  );
};

export default AwardsForm;
