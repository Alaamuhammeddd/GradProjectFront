// src/components/Projects.js
import "../Styles/Projects.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard";
import { Link } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";
import debounce from "lodash.debounce";

const Projects = () => {
  const auth = getAuthUser();
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  // Function to handle search input changes
  const handleSearch = (value) => {
    setQuery(value);

    axios
      .post("http://localhost:4000/search/search", { query: value })
      .then((response) => {
        const sortedProjects = response.data.sort(
          (a, b) => b.total_votes - a.total_votes
        );
        setProjects(sortedProjects);
      })
      .catch((error) => {
        console.error("Error searching projects:", error);
      });
  };

  // Debounced version of handleSearch
  const debouncedSearch = useCallback(debounce(handleSearch, 20), []);

  // Initial fetch of all projects
  useEffect(() => {
    axios
      .get("http://localhost:4000/project/accepted")
      .then((response) => {
        const sortedProjects = response.data.sort(
          (a, b) => b.total_votes - a.total_votes
        );
        setProjects(sortedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup debounce function on component unmount
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <div className="main-content">
        <div className="search-container">
          <input
            className="searchInput"
            type="text"
            placeholder="Search for projects"
            value={query}
            onChange={(e) => debouncedSearch(e.target.value)}
          />
          <div className="actions"></div>
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
