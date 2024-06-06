import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../Styles/ManageComments.css";
import { FaTrash } from "react-icons/fa";
import { getAuthUser } from "../../Helper/Storage";
import { LuSendHorizonal } from "react-icons/lu";
import "../../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Manage Comments</div>
      <ul className="nav-links">
        <li>
          <a href="/admin-dashboard/manage-user">User</a>
        </li>
        <li>
          <a href="/admin-dashboard">Dashboard</a>
        </li>
      </ul>
    </div>
  );
};

const ManageComments = () => {
  const auth = getAuthUser();
  const admin_token = auth.admin_token;
  const [comments, setComments] = useState([]);
  const [showGradesPopup, setShowGradesPopup] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const handleCloseGradesPopup = () => {
    setShowGradesPopup(false);
  };

  useEffect(() => {
    // Fetch comments from the backend
    axios
      .get(`http://localhost:4000/admin/comments`)
      .then((response) => {
        setComments(response.data.comments);
        console.log("Fetched comments:", response.data.comments); // Log the fetched comments
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleDelete = (commentId) => {
    setCommentToDelete(commentId);
    setShowGradesPopup(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:4000/admin/comments/${commentToDelete}`, {
        headers: {
          token: admin_token,
        },
      })
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== commentToDelete)
        );
        setShowGradesPopup(false);
        setCommentToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setShowGradesPopup(false);
      });
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
                <button
                  className="cancel-button"
                  onClick={handleCloseGradesPopup}
                >
                  NO,cancel
                </button>
                <button className="delete-button" onClick={confirmDelete}>
                  yes, delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Sidebar />
      <div className="project-comments">
        <div className="manage-comments-text">
          <h3>Comments</h3>
          <table>
            <thead>
              <tr>
                <th>Commenter Name</th>
                <th>Comment Text</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.comment_id}>
                  <td>{comment.commenter_name}</td>
                  <td>{comment.comment_text}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(comment.comment_id)}
                      className="del-btn"
                    >
                      <FaTrash color="#dc3545" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageComments;
