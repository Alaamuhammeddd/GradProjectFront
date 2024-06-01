import React, { useState } from "react";
import "../../../Styles/AddProject.css";

function ProjectMembers({ formData, setFormData }) {
  const [members, setMembers] = useState(formData.teammateData);

  const handleInputChange = (index, event) => {
    const updatedMembers = [...members];
    updatedMembers[index][event.target.name] = event.target.value;
    setMembers(updatedMembers);
    setFormData({ ...formData, teammateData: updatedMembers });
  };

  const addMember = () => {
    setMembers([...members, { name: "", studentId: "" }]);
  };

  return (
    <div className="projectMembers-container">
      {members.map((member, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className="project-member-control"
            type="text"
            name="name"
            placeholder="Student's Name..."
            value={member.name}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            className="project-member-control"
            type="text"
            name="studentId"
            placeholder="Student's ID..."
            value={member.studentId}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
      <button onClick={addMember}>Add Another Team Member &#x002B;</button>
    </div>
  );
}

export default ProjectMembers;
