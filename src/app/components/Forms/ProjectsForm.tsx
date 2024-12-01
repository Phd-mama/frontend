import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleInputChange = (index: number, value: string) => {
    const updatedProjects = [...(formData.selected_projects || [])];
    updatedProjects[index] = { name: value };
    setFormData({ ...formData, selected_projects: updatedProjects });
  };

  const handleAddProject = () => {
    setFormData({
      ...formData,
      selected_projects: [...(formData.selected_projects || []), { name: "" }],
    });
  };

  const handleDeleteProject = (index: number) => {
    setFormData({
      ...formData,
      selected_projects: (formData.selected_projects || []).filter(
        (_: any, i: number) => i !== index
      ),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Projects</h3>
      <ul>
        {formData.selected_projects && formData.selected_projects.length > 0 ? (
          formData.selected_projects.map((project: any, index: number) => (
            <li
              key={index}
              className="flex items-center space-x-2 mb-4 border border-pink-600 p-2 rounded-lg"
            >
              <input
                type="text"
                placeholder="Project Name"
                value={project.name || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button                 
                type="button"
                onClick={() => handleDeleteProject(index)} className="hover:text-pink-600">
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No projects available</li>
        )}
      </ul>
      <button
        type="button"
        onClick={handleAddProject}
        className="text-pink-600 flex items-center space-x-2 mt-2"
      >
        <FaPlus /> <span>Add Project</span>
      </button>
    </div>
  );
};

export default ProjectsForm;
