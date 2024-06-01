import React from "react";
import "../../../Styles/AddProject.css";

function ProjectFiles({ formData, projectFile, setFormData, onFileChange }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    onFileChange(selectedFile);
    console.log(selectedFile);
  };

  return (
    <div className="files-container">
      <div className="form-group">
        <label htmlFor="projectWinRar">Project files (WinRAR)</label>
        <input
          type="file"
          name="projectFile"
          className="form-control-file"
          id="projectWinRar"
          ref={projectFile}
          accept=".zip, .rar"
          onChange={handleFileChange}
        />
        {formData.projectFile && <span>{formData.projectFile.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="projectLinks">Project links (Github)</label>
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
