import React from "react";
import image from "../Assets/Images/Logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../Styles/Header.css";
const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="Container">
          <Navbar.Brand href={"/home"} className="navbar-brand">
            <img
              src={image}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#explore">Explore</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
