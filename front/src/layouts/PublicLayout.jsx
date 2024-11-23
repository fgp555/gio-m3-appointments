import React from "react";
import NavBar from "../components/NavBar/NavBar";
import "./PublicLayout.css";

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <NavBar />
      <div className="page-content-app">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PublicLayout;
