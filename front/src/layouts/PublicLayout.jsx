import React from "react";
import NavBar from "../components/NavBar/NavBar";
import "./PublicLayout.css";
import Footer from "../components/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="public-layout">
      <NavBar />
      <div className="page-content-app">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
