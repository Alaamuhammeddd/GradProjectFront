import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/ViewProject.css";
// import { MdEdit } from "react-icons/md";
// import { FaTrashAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { getAuthUser } from "../Helper/Storage";
import { LuSendHorizonal } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";

const ViewProject = () => {
  const auth = getAuthUser();
  console.log(auth);
  const { projectId } = useParams();
  const [projects, setProjects] = useState({
    loading: true,
    result: { title: "" },
    err: null,
  });
  function calculateTimeDifference(timestamp) {
    const commentDate = new Date(timestamp);
    const currentDate = new Date();

    const timeDifference = Math.abs(currentDate - commentDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else {
      return "Just now";
    }
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch project details
    axios
      .get(`http://localhost:4000/project/${projectId}`)
      .then((response) => {
        // console.log(response);
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

    // Fetch comments
    axios
      .get(`http://localhost:4000/comment/show-comments/${projectId}`)
      .then((response) => {
        console.log(response);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        console.log(error);
      });
  }, [projectId, newComment]);

  const handleAddComment = () => {
    axios
      .post(`http://localhost:4000/comment/add-comment/${projectId}`, {
        commenter_id: auth.student_id,
        commenter_name: auth.student_name,
        comment_text: newComment,
      })
      .then((response) => {
        console.log(response);
        console.log("Comment added successfully");
        setNewComment("");
        // Optionally, you can fetch comments again to update the comments list
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div className="project-container">
      <div
        className="project-activities"
        style={{ justifyContent: "flex-start", marginTop: "70px" }}
      >
        <div className="text">
          <h3 style={{ textAlign: "left", marginBottom: "30px" }}>
            Project Activities
          </h3>
          <ul>
            <li>
              <span>Username</span> Liked Project
              <br />
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
            <li>
              <span>Username</span> Liked Project
              <br />
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
            <li>
              <span>Username</span> Liked Project
              <br />
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
            <li>
              <span>Username</span> Liked Project
              <br />
              <span>Activity: 12/04/2021, 6:37 p.m</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="project-header">
        <div
          style={{ display: "inline-block", marginTop: "50px" }}
          className="text"
        >
          <h2>{projects.result.title}</h2>
          <em>
            {" "}
            <p>{projects.result.description}</p>
          </em>
        </div>
      </div>
      <div className="project-comments">
        <div className="text">
          <h3
            style={{ textAlign: "center", borderBottom: "3px solid #DFE2E8 " }}
          >
            {" "}
            Comments
          </h3>
          <br />
          {comments.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "23px" }}>
              No comments on this project
            </p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li
                  key={comment.comment_id}
                  style={{
                    marginBottom: "20px",
                    listStyleType: "none",
                    borderBottom: "3px solid #DFE2E8",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {comment.commenter_name}
                  </span>{" "}
                  <span style={{ color: "#363B4B" }}>
                    {calculateTimeDifference(comment.timestamp)}
                  </span>
                  <p>{comment.comment_text}</p>
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></input>{" "}
          <button style={{ border: "none" }}>
            <LuSendHorizonal size="30px" onClick={handleAddComment} />
          </button>
        </div>
      </div>
      <div className="project-details">
        <div className="project-stats">
          <div className="text">
            <p>
              <span>
                <strong>
                  {" "}
                  Supervisor : {projects.result.supervisor_name}{" "}
                </strong>
              </span>
            </p>
            <p>
              <strong>
                {" "}
                <span>Graduation Year : </span>{" "}
                {projects.result.graduation_year}{" "}
              </strong>
            </p>
            <p>
              <strong>
                {" "}
                <span>Graduation Term :</span> {projects.result.graduation_term}{" "}
              </strong>
            </p>
            <p>
              <strong>
                {" "}
                <span>Total Votes:</span> {projects.result.total_votes}{" "}
              </strong>
            </p>
            <p>
              <strong>
                {" "}
                <span>Department :</span> {projects.result.department_name}{" "}
              </strong>
            </p>
          </div>
        </div>
        <div className="project-actions" style={{ justifyContent: "flex-end" }}>
          <div
            style={{
              display: "block",
              textAlign: "right",
              marginBottom: "20px",
              marginRight: "75px",
            }}
          >
            <button className="bookmark-btn">
              <FaBookmark size="20px" /> <strong>Bookmark Project</strong>
            </button>
          </div>
          <div
            style={{
              display: "block",
              textAlign: "right",
              marginBottom: "20px",
              marginRight: "75px",
            }}
          >
            <button className="dwnld-btn">
              <FaDownload size="20px" /> <strong>Download Project</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
