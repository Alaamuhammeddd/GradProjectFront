import React, { useEffect, useState } from "react";
import "../Styles/ProjectsCard.css";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";
const ProjectsCard = ({ project }) => {
  const projectId = project.project_id;
  const auth = getAuthUser();
  const [isVoted, setVote] = useState(false);
  const [total_votes, setTotalVotes] = useState(project.total_votes);
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   const projectId = project.project_id;
  //   navigate(`/view-project/${projectId}`);
  // };
  useEffect(() => {
    const bookmarkStatusFromLocalStorage = localStorage.getItem(
      `vote-${projectId}`
    );
    if (bookmarkStatusFromLocalStorage !== null) {
      setVote(bookmarkStatusFromLocalStorage === "true");
    }
  });
  const handleVoting = () => {
    axios
      .post(`http://localhost:4000/vote/${projectId}/${auth.student_id}`)
      .then((response) => {
        const votingStatus = response.data.voteStatus;
        if (votingStatus) {
          console.log("Bookmark added successfully");
          setVote(votingStatus);
          setTotalVotes((prevTotalVotes) => prevTotalVotes + 1);
          localStorage.setItem(`vote-${projectId}`, votingStatus);
        } else {
          console.log("Bookmark removed successfully");
          localStorage.setItem(`vote-${projectId}`, votingStatus);
          setVote(votingStatus);
          setTotalVotes((prevTotalVotes) => prevTotalVotes - 1);
        }
      })
      .catch((error) => {
        console.error("Error adding/removing bookmark:", error);
      });
  };
  return (
    <div className="project-card">
      <div className="cardText">
        <Link
          to={"/view-project/" + projectId}
          className={"title" && "cardTitle"}
        >
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
          target="_blank" // Add this line
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "black" }}
        >
          {" "}
          <FaGithub className="github-logo" size="40px" />
        </a>
        {/* <img src={project.project_image_path} alt={project.title} /> */}

        <p>
          <button
            style={{ background: "none", border: "none" }}
            onClick={handleVoting}
          >
            {isVoted ? (
              <>
                <BiSolidUpvote size="40px" color="black" />{" "}
                <strong>
                  <span style={{ fontSize: "20px" }}>{total_votes}</span>
                </strong>
              </>
            ) : (
              <>
                <BiUpvote size="40px" color="black" />{" "}
                <strong>
                  <span style={{ fontSize: "20px" }}>
                    {project.total_votes}
                  </span>
                </strong>
              </>
            )}
          </button>
        </p>
      </div>
    </div>
  );
};

export default ProjectsCard;
