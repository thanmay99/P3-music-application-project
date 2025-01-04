import React from "react";
import "./Sidebar.css";
import add_product_icon from "../Assets/Product_Cart.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addsong" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="Add Song" />
          <p>Add Song</p>
        </div>
      </Link>
      <Link to="/uploadedsongs" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p>Uploaded Songs</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;