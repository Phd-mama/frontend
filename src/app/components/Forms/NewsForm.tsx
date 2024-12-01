import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const NewsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (index: number, value: string) => {
    const updatedNews = [...(formData.news || [])];
    updatedNews[index] = { name: value };
    setFormData({ ...formData, news: updatedNews });
  };

  const handleAddNews = () => {
    setFormData({
      ...formData,
      news: [...(formData.news || []), { name: "" }],
    });
  };

  const handleDeleteNews = (index: number) => {
    setFormData({
      ...formData,
      news: (formData.news || []).filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">News</h3>
      <ul>
        {formData.news && formData.news.length > 0 ? (
          formData.news.map((news: any, index: number) => (
            <li
              key={index}
              className="flex items-center space-x-2 mb-4 border border-pink-600 p-2 rounded-lg"
            >
              <input
                type="text"
                placeholder="News Name"
                value={news.name || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button 
              type="button" 
              onClick={() => handleDeleteNews(index)} className="hover:text-pink-600">
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No news available</li>
        )}
      </ul>
      <button
        type="button"
        onClick={handleAddNews}
        className="text-pink-600 flex items-center space-x-2 mt-2"
      >
        <FaPlus /> <span>Add News</span>
      </button>
    </div>
  );
};

export default NewsForm;
