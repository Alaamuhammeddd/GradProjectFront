import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProjectsCard from "../ProjectsCard";
import { getAuthUser } from "../../Helper/Storage";
import { useParams } from "react-router-dom";
const BookmarkedProjects = () => {
  const auth = getAuthUser();
  const [projects, setProjects] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/bookmark/show-bookmarks/${auth.student_id}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [projects, projectId]);

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectsCard key={project.project_id} project={project} />
        ))}
      </div>
    </>
  );
};

export default BookmarkedProjects;
