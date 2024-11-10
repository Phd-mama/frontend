import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ExpertiseForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleNestedInputChange = (index: number, value: string) => {
    const updatedExpertise = [...(formData.expertise || [])];
    updatedExpertise[index] = { ...updatedExpertise[index], name: value };
    setFormData({ ...formData, expertise: updatedExpertise });
  };

  const handleAddExpertise = () => {
    setFormData({ ...formData, expertise: [...(formData.expertise || []), { name: "" }] });
  };

  const handleDeleteExpertise = (index: number) => {
    setFormData({
      ...formData,
      expertise: (formData.expertise || []).filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Expertise</h3>
      <ul>
        {formData.expertise && formData.expertise.length > 0 ? (
          formData.expertise.map((item: any, index: number) => (
            <li key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => handleNestedInputChange(index, e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button onClick={() => handleDeleteExpertise(index)} className="hover:text-pink-600">
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No expertise available</li>
        )}
      </ul>
      <button type="button" onClick={handleAddExpertise} className="text-pink-600 flex items-center space-x-2 mt-2">
        <FaPlus /> <span>Add Expertise</span>
      </button>
    </div>
  );
};

export default ExpertiseForm;
