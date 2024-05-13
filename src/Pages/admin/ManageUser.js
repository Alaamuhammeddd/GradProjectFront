import React from "react";
import "../Styles/Manageuser.css";
import currentUsersIcon from "../Assets/Images/current_users_icon.jpeg";
import deletedUsersIcon from "../Assets/Images/deleted_users_icon.jpeg";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Users</div>
      <ul className="nav-links">
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Manage Comments </a>
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
const ManageUser = () => {
  const users = [
    { id: 1, name: "202000944" },
    { id: 2, name: "202000945" },
    { id: 3, name: "202000946" },
    { id: 4, name: "202000947" },
    { id: 5, name: "202000948" },
  ];

  const handleDeleteUser = (id) => {
    console.log(`Deleting user with ID ${id}`);
  };

  return (
    <>
      <Sidebar />
      <div className="admin-panel">
        <div className="admin-icon-left">
          <div className="icon-container">
            {/* <div> */}
            <img
              src={currentUsersIcon}
              alt="Current Users"
              className="icon-img-left"
            />
            {/* </div> */}
            <div className="icon-info-left">
              <span className="badge">10+</span>
              <p className="current">Current Users</p>
            </div>
          </div>
        </div>

        <div className="admin-icon-right">
          <div className="icon-container">
            <img
              src={deletedUsersIcon}
              alt="Deleted Users"
              className="icon-img-right"
            />
            <div className="icon-info-right">
              <span className="badgee">5+</span>
              <p className="deleted">Deleted Users</p>
            </div>
          </div>
        </div>
      </div>
      <div className="user-table">
        <h2
          className="students-label"
          style={{ position: "absolute", left: "280px", top: "300px" }}
        >
          Students
        </h2>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;
