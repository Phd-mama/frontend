import { FaPlus, FaTrash } from "react-icons/fa";

interface FormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectsForm: React.FC<FormProps> = ({ formData, setFormData }) => {
  const handleNestedInputChange = (index: number, subField: string, value: string) => {
    const updatedProjects = [...(formData.selected_projects || [])];
    updatedProjects[index] = { ...updatedProjects[index], [subField]: value };
    setFormData({ ...formData, selected_projects: updatedProjects });
  };

  const handleAddProject = () => {
    setFormData({ ...formData, selected_projects: [...(formData.selected_projects || []), { title: "", description: "" }] });
  };

  const handleDeleteProject = (index: number) => {
    setFormData({
      ...formData,
      selected_projects: (formData.selected_projects || []).filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-xl rounded-xl border border-black">
      <h3 className="text-2xl font-bold mb-4 text-pink-600">Projects</h3>
      <ul>
        {formData.selected_projects && formData.selected_projects.length > 0 ? (
          formData.selected_projects.map((project: any, index: number) => (
            <li key={index} className="flex flex-col space-y-2 mb-4 border border-pink-600 p-2 rounded-lg">
              <label className="text-pink-600 font-semibold">Project Title:</label>
              <input
                type="text"
                placeholder="Project Title"
                value={project.title || ""}
                onChange={(e) => handleNestedInputChange(index, "title", e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <label className="text-pink-600 font-semibold">Project Description:</label>
              <textarea
                placeholder="Project Description"
                value={project.description || ""}
                onChange={(e) => handleNestedInputChange(index, "description", e.target.value)}
                className="p-2 border border-black rounded-lg w-full shadow-inner"
              />
              <button onClick={() => handleDeleteProject(index)} className="self-start hover:text-pink-600">
                <FaTrash className="text-pink-600" />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No projects available</li>
        )}
      </ul>
      <button type="button" onClick={handleAddProject} className="text-pink-600 flex items-center space-x-2 mt-2">
        <FaPlus /> <span>Add Project</span>
      </button>
    </div>
  );
};

export default ProjectsForm;
