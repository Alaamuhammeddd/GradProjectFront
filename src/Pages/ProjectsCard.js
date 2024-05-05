import React from "react";
import "../Styles/ProjectsCard.css";
import { BiUpvote } from "react-icons/bi";

import { FaGithub } from "react-icons/fa6";
const ProjectsCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="cardText">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p>Professor : Dr.{project.supervisor_name}</p>
        <p>Year: {project.graduation_year}</p>
        <p>Term: {project.graduation_term}</p>
        <p>Department: {project.department_name}</p>
        {/* <p>Approval Status: {project.approval_status}</p> */}
      </div>
      <br />
      <div className="links">
        <a
          href={project.github_link}
          style={{ textDecoration: "none", color: "black" }}
        >
          {" "}
          <FaGithub size="25px" />
        </a>
        <img src={project.project_image_path} alt={project.title} />

        <p>
          <BiUpvote size="25px" color="black" />{" "}
          <span>{project.total_votes}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectsCard;
