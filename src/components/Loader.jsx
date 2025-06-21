import React from "react";
import "./Loader.css";

const Loader = () => (
  <div className="loader-container">
    <div className="loader-spinner"></div>
    <span className="loader-text">Loading...</span>
  </div>
);

export default Loader;