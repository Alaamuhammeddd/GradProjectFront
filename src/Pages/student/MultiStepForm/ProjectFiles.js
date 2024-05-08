import React from "react";
import "../../../Styles/AddProject.css";
function ProjectFiles({ formData, setFormData }) {
  return (
    <div className="files-container">
      <div className="form-group">
        <label for="projectWinRar">Project files (WinRAR)</label>
        <input
          type="file"
          className="form-control-file"
          id="projectWinRar"
          accept=".rar, .zip"
          value={formData.projectFiles}
          onChange={(e) => {
            setFormData({ ...formData, projectFiles: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label for="projectLinks">Project links (Github, Figma, etc)</label>
        <input
          type="text"
          className="form-control-file"
          value={formData.github_link}
          onChange={(e) => {
            setFormData({ ...formData, github_link: e.target.value });
          }}
          id="projectLinks"
        />
      </div>
    </div>
  );
}

export default ProjectFiles;
