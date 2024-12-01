import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PublicationsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (index: number, value: string) => {
    const updatedPublications = [...(formData.selected_publications || [])];
    updatedPublications[index] = { name: value };
    setFormData({ ...formData, selected_publications: updatedPublications });
  };

  const handleAddPublication = () => {
    setFormData({
      ...formData,
      selected_publications: [...(formData.selected_publications || []), { name: "" }],
    });
  };

  const handleDeletePublication = (index: number) => {
    setFormData({
      ...formData,
      selected_publications: (formData.selected_publications || []).filter(
        (_: any, i: number) => i !== index
      ),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Publications</h3>
      <ul>
        {formData.selected_publications && formData.selected_publications.length > 0 ? (
          formData.selected_publications.map((publication: any, index: number) => (
            <li
              key={index}
              className="flex items-center space-x-2 mb-4 border border-pink-600 p-2 rounded-lg"
            >
              <input
                type="text"
                placeholder="Publication Name"
                value={publication.name || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button
                type="button" 
                onClick={() => handleDeletePublication(index)}
                className="hover:text-pink-600"
              >
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No publications available</li>
        )}
      </ul>
      <button
        type="button"
        onClick={handleAddPublication}
        className="text-pink-600 flex items-center space-x-2 mt-2"
      >
        <FaPlus /> <span>Add Publication</span>
      </button>
    </div>
  );
};

export default PublicationsForm;
