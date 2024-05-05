import React from "react";
import "../Styles/ProjectsCard.css";
const ProjectsCard = ({ project }) => {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>Professor : Dr.{project.supervisor_name}</p>
      <p>Year: {project.graduation_year}</p>
      <p>Term: {project.graduation_term}</p>
      <p>Department: {project.department_name}</p>
      <p>
        GitHub Link: <a href={project.github_link}>{project.github_link}</a>
      </p>
      <img src={project.project_image_path} alt={project.title} />
      <p>Approval Status: {project.approval_status}</p>
      <p>Total Votes: {project.total_votes}</p>
    </div>
  );
};

export default ProjectsCard;
