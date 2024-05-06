import React from "react";
import "../Styles/ProjectsCard.css";
import { BiUpvote } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProjectsCard = ({ project }) => {
  const projectId = project.project_id;
  const navigate = useNavigate();
  // const handleClick = () => {
  //   const projectId = project.project_id;
  //   navigate(`/view-project/${projectId}`);
  // };

  return (
    <div className="project-card">
      <div className="cardText">
        <Link to={"/view-project/" + projectId}>
          <h2>{project.title}</h2>
          <div className="cardTitle"></div>
        </Link>
        <br />
        <div>
          <p>{project.description}</p>
          <p>Professor : {project.supervisor_name}</p>
          <p>Year: {project.graduation_year}</p>
          <p>Term: {project.graduation_term}</p>
          <p>Department: {project.department_name}</p>
        </div>
        {/* <p>Approval Status: {project.approval_status}</p> */}
      </div>
      <br />
      <div className="links">
        <a
          href={project.github_link}
          style={{ textDecoration: "none", color: "black" }}
        >
          {" "}
          <FaGithub className="github-logo" size="40px" />
        </a>
        {/* <img src={project.project_image_path} alt={project.title} /> */}

        <p>
          <BiUpvote size="40px" color="black" />{" "}
          <span style={{ fontSize: "20px" }}>{project.total_votes}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectsCard;
