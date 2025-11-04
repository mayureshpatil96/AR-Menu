// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(255,255,255,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h1 style={{ color: "orange", fontSize: "1.6rem", fontWeight: "bold" }}>
        Cashew Cafe
      </h1>

      {/* Hamburger Icon (Mobile) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "none",
          flexDirection: "column",
          cursor: "pointer",
        }}
        className="menu-icon"
      >
        <div style={{ width: "25px", height: "3px", background: "#fff", margin: "4px 0" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#fff", margin: "4px 0" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#fff", margin: "4px 0" }}></div>
      </div>

      {/* Menu Links */}
      <div
        className={`menu-links ${isOpen ? "open" : ""}`}
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/menu" style={{ color: "#fff", textDecoration: "none" }}>
          Menu
        </Link>
        <Link to="/cart" style={{ color: "orange" }}>🛒 Cart</Link>

      </div>

      {/* Mobile Menu Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-icon {
              display: flex !important;
            }
            .menu-links {
              position: absolute;
              top: 70px;
              left: 0;
              width: 100%;
              background: #000;
              flex-direction: column;
              align-items: center;
              gap: 20px;
              padding: 20px 0;
              display: none;
            }
            .menu-links.open {
              display: flex;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
