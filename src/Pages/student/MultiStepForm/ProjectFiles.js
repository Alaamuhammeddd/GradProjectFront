import react from "react";
import { useRef } from "react";
import "../../../Styles/AddProject.css";
function ProjectFiles({ formData, setFormData, projectFile }) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  };
  return (
    <div className="files-container">
      <div className="form-group">
        <label for="projectWinRar">Project files (WinRAR)</label>
        <input
          type="file"
          className="form-control-file"
          id="projectWinRar"
          ref={projectFile}
          accept=".rar, .zip"
          onChange={handleFileChange}
          // Initialize value with file name if available
        />
        {formData.projectFile && <span>{formData.projectFile.name}</span>}
      </div>
      <div className="form-group">
        <label for="projectLinks">Project links (Github)</label>
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
