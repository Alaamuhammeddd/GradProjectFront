import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/ViewProject.css";
import { FaRegBookmark } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { getAuthUser } from "../Helper/Storage";
import { LuSendHorizonal } from "react-icons/lu";
import { FaBookmark } from "react-icons/fa6";

const ViewProject = () => {
  const auth = getAuthUser();
  console.log(auth);
  const { projectId } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);

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
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

    const bookmarkStatusFromLocalStorage = localStorage.getItem(
      `bookmark-${projectId}`
    );
    if (bookmarkStatusFromLocalStorage !== null) {
      setIsBookmarked(bookmarkStatusFromLocalStorage === "true");
    }
  }, [projectId, newComment]);

  const handleBookmark = () => {
    axios
      .post(
        `http://localhost:4000/bookmark/add-bookmark/${projectId}/${auth.student_id}`
      )
      .then((response) => {
        const bookmarkStatus = response.data.bookmarkStatus;
        if (bookmarkStatus) {
          console.log("Bookmark added successfully");
          setIsBookmarked(bookmarkStatus);
          localStorage.setItem(`bookmark-${projectId}`, bookmarkStatus);
        } else {
          console.log("Bookmark removed successfully");
          localStorage.setItem(`bookmark-${projectId}`, bookmarkStatus);
          setIsBookmarked(bookmarkStatus); // Update state if bookmark is removed
        }
      })
      .catch((error) => {
        console.error("Error adding/removing bookmark:", error);
      });
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") {
      // alert("Comment cannot be empty!");
      return;
    }

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

  const handleDownload = () => {
    axios({
      url: `http://localhost:4000/download/download/${projectId}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${projects.result.title}.zip`); // Change filename as per your requirement
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading project:", error);
      });
  };

  return (
    <div className="project-container">
      <div
        className="project-activities"
        style={{ justifyContent: "flex-start", marginTop: "70px" }}
      >
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
        <div
          className="project-actions"
          style={{
            justifyContent: "flex-start",

            display: "block",
          }}
        >
          {auth && auth.student_id > 0 && (
            <div
              style={{
                display: "block",
                textAlign: "left",
                marginBottom: "20px",
                marginRight: "75px",
              }}
            >
              <button className="bookmark-btn" onClick={handleBookmark}>
                {isBookmarked ? (
                  <>
                    <FaBookmark size="20px" /> <strong>Bookmarked</strong>
                  </>
                ) : (
                  <>
                    <FaRegBookmark size="20px" />{" "}
                    <strong>Bookmark Project</strong>
                  </>
                )}
              </button>
            </div>
          )}
          <div
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "20px",
              marginRight: "75px",
              marginTop: "20px",
            }}
          >
            <button className="dwnld-btn" onClick={handleDownload}>
              <FaDownload size="20px" /> <strong>Download Project</strong>
            </button>
          </div>
        </div>
      </div>

      <div className="project-header">
        <div style={{ marginTop: "50px" }} className="text">
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
          {auth && auth.student_id > 0 ? (
            <>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></input>{" "}
              <button style={{ border: "none" }}>
                <LuSendHorizonal size="30px" onClick={handleAddComment} />
              </button>
            </>
          ) : (
            <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>
              Log in as a student to add a comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
