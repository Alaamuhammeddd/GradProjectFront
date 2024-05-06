import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/ViewProject.css";

const ViewProject = () => {
  const { projectId } = useParams();
  const [projects, setProjects] = useState({
    loading: true,
    result: { title: "" },
    err: null,
  });

  useEffect(() => {
    setProjects((prevProjects) => ({ ...prevProjects, loading: true }));
    axios
      .get(`http://localhost:4000/auth/projects/${projectId}`)
      .then((response) => {
        console.log(response);
        setProjects((prevProjects) => ({
          ...prevProjects,
          result: response.data,
          loading: false,
          err: null,
        }));
      })
      .catch((error) => {
        setProjects((prevProjects) => ({
          ...prevProjects,
          loading: false,
          err: "something went wrong",
        }));
        console.error("Error fetching projects:", error);
      });
  }, [projectId]);

  return (
    <div>
      <div className="project-header">
        <div style={{ display: "inline-block" }} className="text">
          <h2>{projects.result.title}</h2>
          <p>{projects.result.description}</p>
        </div>
      </div>
      <div className="project-details">
        <div className="project-stats">
          <div className="text">
            <p>
              <span>Supervisor : {projects.result.supervisor_name}</span>
            </p>
            <p>
              <span>Graduation Year : </span> {projects.result.graduation_year}
            </p>
            <p>
              <span>Graduation Term :</span> {projects.result.graduation_term}
            </p>
            <p>
              <span>Total Votes:</span> {projects.result.total_votes}
            </p>
            <p>
              <span>Department :</span> {projects.result.department_name}
            </p>
          </div>
        </div>
        <div className="project-actions">
          <div style={{ display: "inline-block" }}>
            <button>Edit Project</button>
            <button>Delete Project</button>
          </div>
        </div>
        <div className="project-card"></div>
        <div className="project-activities">
          <h3>Activities</h3>
          <ul>
            <li>
              <span>User</span> Liked Project
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
            <li>
              <span>User2</span> Bookmarked Project
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
            <li>
              <span>User</span> Commented on Project
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
          </ul>
        </div>
        <div className="project-comments">
          <h3>Comments</h3>
          <ul>
            <li>
              <span>User</span> 1 hour ago
              <p>Wonderful</p>
              <button>Respond</button>
            </li>
            <li>
              <span>User2</span> 1 hour ago
              <p>What a wonderful project!</p>
              <button>Respond</button>
            </li>
          </ul>
          <input type="text" placeholder="Add a comment..." />
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
