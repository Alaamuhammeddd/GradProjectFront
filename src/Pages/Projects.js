import "../Styles/Projects.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProjectsCard from "./ProjectsCard";
import debounce from "lodash.debounce";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [graduationTerm, setGraduationTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [graduationTerms, setGraduationTerms] = useState([]);

  // Fetch department names
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/show-departments")
      .then((response) => {
        setDepartments(response.data.department_names);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  // Fetch graduation terms
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/show-term")
      .then((response) => {
        setGraduationTerms(response.data.graduation_term);
      })
      .catch((error) => {
        console.error("Error fetching graduation terms:", error);
      });
  }, []);

  // Function to handle search input changes
  const handleSearch = (value) => {
    setQuery(value);
    fetchProjects(value, department, graduationTerm);
  };

  // Debounced version of handleSearch
  const debouncedSearch = useCallback(debounce(handleSearch, 100), [
    department,
    graduationTerm,
  ]);

  // Fetch projects with filters
  const fetchProjects = (
    searchQuery,
    departmentFilter,
    graduationTermFilter
  ) => {
    let endpoint = "http://localhost:4000/search/search";
    let data = { query: searchQuery };

    // If department filter is selected
    if (departmentFilter) {
      endpoint = "http://localhost:4000/search/Filter-Dep";
      data = { ...data, department: departmentFilter };
    }

    if (graduationTermFilter) {
      endpoint = "http://localhost:4000/search/Filter-semster";
      data = { ...data, semester: graduationTermFilter };
    }

    axios
      .post(endpoint, data)
      .then((response) => {
        const sortedProjects = response.data.sort(
          (a, b) => b.total_votes - a.total_votes
        );
        setProjects(sortedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  // Fetch projects when department or graduation term changes
  useEffect(() => {
    fetchProjects(query, department, graduationTerm);
  }, [query, department, graduationTerm]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
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
          <select
            className="filterDropdown"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ marginLeft: "10px", marginRight: "40px" }}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            className="filterDropdown"
            value={graduationTerm}
            onChange={(e) => setGraduationTerm(e.target.value)}
          >
            <option value="">All Terms</option>
            {graduationTerms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
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
