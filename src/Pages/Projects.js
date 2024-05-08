// src/components/Projects.js
import "../Styles/Projects.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard";
import { Link } from "react-router-dom";
// -

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/project/all")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <>
      {/* <div className="sidebar" style={{ backgroundColor: "grey" }}>
        <Sidebar />
      </div> */}
      <div className="main-content">
        <div className="search-container">
          <input
            className="searchInput"
            type="search"
            placeholder="&#x1F50E;&#xFE0E; Search"
          />
          <div className="actions">
            <Link to={"/add-project"}>
              <button className="add-btn"> Add My Project</button>
            </Link>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectsCard key={project.project_id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
