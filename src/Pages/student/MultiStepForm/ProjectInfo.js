import React from "react";
import "../../../Styles/AddProject.css";
function ProjectInfo({ formData, setFormData }) {
  const handleDepartmentChange = (event) => {
    setFormData({ ...formData, department_name: event.target.value });
  };
  return (
    <div className="projectInfo-container">
      <select
        className="project-info-control"
        value={formData.department_name}
        onChange={handleDepartmentChange}
      >
        <option disabled value="">
          Select Department
        </option>
        <option value="Computer Science">Computer Science</option>
        <option value="Information Systems">Information Systems</option>
        <option value="Information Technology">Information Technology</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
      </select>
      <input
        type="text"
        className="project-info-control"
        placeholder="Supervisor's Name..."
        value={formData.supervisor_name}
        onChange={(e) => {
          setFormData({ ...formData, supervisor_name: e.target.value });
        }}
      />
      <input
        type="text"
        className="project-info-control"
        placeholder="Supervisor's ID..."
        value={formData.professor_id}
        onChange={(e) => {
          setFormData({ ...formData, professor_id: e.target.value });
        }}
      />
    </div>
  );
}

export default ProjectInfo;
