// src/components/Projects.js
import "../Styles/Projects.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard";
const Projects = () => {
  const [projects, setProjects] = useState([]);

  const handleClick = () => {};
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
    <>
      <div className="search-container">
        <input
          className="searchInput"
          type="search"
          placeholder="&#x1F50E;&#xFE0E; Search"
        />
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectsCard key={project.project_id} project={project} />
        ))}
      </div>
    </>
  );
};

export default Projects;
