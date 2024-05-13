import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/managecomments.css";
import { FaTrash } from "react-icons/fa";
import { getAuthUser } from "../Helper/Storage";
import { LuSendHorizonal } from "react-icons/lu";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Manage Comments</div>
      <ul className="nav-links">
        <li>
          <a href="#">User</a>
        </li>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

const ManageComments = () => {
  const [showGradesPopup, setShowGradesPopup] = useState(false);
  const handleCloseGradesPopup = () => {
    setShowGradesPopup(false);
  };

  const auth = getAuthUser();
  const { projectId } = useParams();
  //   function calculateTimeDifference(timestamp) {
  //     const commentDate = new Date(timestamp);
  //     const currentDate = new Date();

  //     const timeDifference = Math.abs(currentDate - commentDate);

  //     const seconds = Math.floor(timeDifference / 1000);
  //     const minutes = Math.floor(seconds / 60);
  //     const hours = Math.floor(minutes / 60);
  //     const days = Math.floor(hours / 24);

  //     if (days > 0) {
  //       return days === 1 ? "1 day ago" : `${days} days ago`;
  //     } else if (hours > 0) {
  //       return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  //     } else if (minutes > 0) {
  //       return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  //     } else if (seconds > 0) {
  //       return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  //     } else {
  //       return "Just now";
  //     }
  //   }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
  const handledelete = () => {
    setShowGradesPopup(true);
  };

  return (
    <>
      <div
        className="grades-popup-container"
        style={{ display: showGradesPopup ? "flex" : "none" }}
      >
        <div className="grades-popup">
          <button className="close-btn" onClick={handleCloseGradesPopup}>
            X
          </button>
          <h2>Delete comment</h2>
          <ul>
            <li style={{ listStyleType: "none" }}>
              <div>
                Are you sure you want to delete this comment? This will remove
                the comment and can’t be undone.
              </div>
              <div>
                <button className="cancel-button">NO,cancel</button>
                <button className="delete-button">yes, delete</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Sidebar />
      <div className="project-comments">
        <div className="text">
          <h3>Comments</h3>
          <ul>
            <li
              style={{
                marginBottom: "20px",
                listStyleType: "none",
                borderBottom: "3px solid #DFE2E8",
              }}
            >
              <span>User</span> 1 hour ago
              <p>Wonderful</p>
              <button onClick={handledelete} className="del-btn">
                <FaTrash color="#dc3545" />
                Delete
              </button>
            </li>
            <li
              style={{
                marginBottom: "20px",
                listStyleType: "none",
                borderBottom: "3px solid #DFE2E8",
              }}
            >
              <span>User2</span> 1 hour ago
              <p>What a wonderful project!</p>
              <button onClick={handledelete} className="del-btn">
                <FaTrash color="#dc3545" />
                Delete
              </button>
            </li>
            <li
              style={{
                marginBottom: "20px",
                listStyleType: "none",
                borderBottom: "3px solid #DFE2E8",
              }}
            >
              <span>User 3</span> 1 hour ago
              <p>This is so bad!</p>
              <button onClick={handledelete} className="del-btn">
                <FaTrash color="#dc3545" />
                Delete
              </button>
            </li>
            <li
              style={{
                marginBottom: "20px",
                listStyleType: "none",
                borderBottom: "3px solid #DFE2E8",
              }}
            >
              <span>User</span> 1 hour ago
              <p> WOWW !</p>
              <button onClick={handledelete} className="del-btn">
                <FaTrash color="#dc3545" />
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManageComments;
