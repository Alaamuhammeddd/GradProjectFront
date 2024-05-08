import React from "react";
import "../../../Styles/AddProject.css";
function ProjectMembers({ formData, setFormData }) {
  return (
    <div className="projectMembers-container">
      <input
        className="project-member-control"
        type="text"
        placeholder="Student's Name..."
        value={formData.teammateData[0].name}
        onChange={(e) => {
          const updatedTeammateData = [...formData.teammateData];
          updatedTeammateData[0].name = e.target.value;
          setFormData({ ...formData, teammateData: updatedTeammateData });
        }}
      />
      <input
        className="project-member-control"
        type="text"
        placeholder="Student's ID..."
        value={formData.teammateData[0].studentId}
        onChange={(e) => {
          const updatedTeammateData = [...formData.teammateData];
          updatedTeammateData[0].studentId = e.target.value;
          setFormData({ ...formData, teammateData: updatedTeammateData });
        }}
      />
    </div>
  );
}

export default ProjectMembers;
