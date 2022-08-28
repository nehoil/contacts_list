import React from "react";
import "./NavBar.scss";
import { TeamOutlined } from "@ant-design/icons";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div className="navbar-content container">
        <a href="/">
          <div className="logo">
            <TeamOutlined />
            Contacts List
          </div>
        </a>
      </div>
    </div>
  );
}
