// src/components/Projects.js
import "../Styles/Projects.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard";
const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/auth/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <div className="projects-grid">
      {/* <h1>Your Projects</h1> */}

      {projects.map((project) => (
        <ProjectsCard key={project.project_id} project={project} />
      ))}
    </div>
  );
};

export default Projects;
