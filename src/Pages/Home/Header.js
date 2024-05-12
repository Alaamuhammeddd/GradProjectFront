import React from "react";
import "./styles/Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2>
              Explore Endless Graduation Project Ideas, Where Creativity Thrives
            </h2>
            <p>Or join us and showcase your own graduation project today!</p>
            <button onClick={handleClick}> Register Now </button>
          </div>

          <div className="col-md-6"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
