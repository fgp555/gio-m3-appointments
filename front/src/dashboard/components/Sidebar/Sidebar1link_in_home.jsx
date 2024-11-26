// src/components/Sidebar.jsx

import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [subMenus, setSubMenus] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setSubMenus({});
  };

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => {
      const newState = { ...prev, [menu]: !prev[menu] };
      Object.keys(prev).forEach((key) => {
        newState[key] = key === menu ? !prev[key] : false;
      });
      return newState;
    });
  };

  const handleLogout = () => {
    dispatch(cleanUser());
    navigate("/login");
  };

  return (
    <div className="sidebar_container">
      <nav id="sidebar" className={sidebar ? "" : "close"}>
        <ul>
          <li>
            <span className="logo">
              <Link to="/">CREFI DASHBOARD</Link>
            </span>
            <button onClick={toggleSidebar} id="toggle-btn" className={sidebar ? "" : "rotate"}>
              <i className="icon-angle-double-left"></i>
            </button>
          </li>
          <li className="active">
            <Link to="/">
              <i className="icon-home"></i>
              My Site
            </Link>
          </li>
          <li>
            <Link to="/appointments">
              <i className="icon-dashboard"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <button onClick={() => toggleSubMenu("createMenu")} className={`dropdown-btn ${subMenus.createMenu ? "rotate" : ""}`}>
              <i className="icon-calendar"></i>
              <span>Appoinments</span>
              <i className="icon-angle-down"></i>
            </button>
            <ul className={`sub-menu ${subMenus.createMenu ? "show" : ""}`}>
              <div>
                <li>
                  <Link to="/appointments">Appoinments</Link>
                </li>
                <li>
                  <Link to="/appointments">Pending</Link>
                </li>
                <li>
                  <Link to="/appointments">Calendar</Link>
                </li>
                <li>
                  <Link to="/appointments">Settings</Link>
                </li>
              </div>
            </ul>
          </li>

          <li>
            <button onClick={() => toggleSubMenu("UsersMenu")} className={`dropdown-btn ${subMenus.UsersMenu ? "rotate" : ""}`}>
              <i className="icon-users"></i>
              <span>Accounts</span>
              <i className="icon-angle-down"></i>
            </button>
            <ul className={`sub-menu ${subMenus.UsersMenu ? "show" : ""}`}>
              <div>
                <li>
                  <Link to="/appointments">Profesionals</Link>
                </li>
                <li>
                  <Link to="/appointments">Patiens</Link>
                </li>
                <li>
                  <Link to="/appointments">Admin</Link>
                </li>
              </div>
            </ul>
          </li>

          {/* ========== ========== */}

          <li>
            <button onClick={() => toggleSubMenu("TodoListMenu")} className={`dropdown-btn ${subMenus.TodoListMenu ? "rotate" : ""}`}>
              <i className="icon-tools"></i>
              <span>Tools</span>
              <i className="icon-angle-down"></i>
            </button>
            <ul className={`sub-menu ${subMenus.TodoListMenu ? "show" : ""}`}>
              <div>
                <li>
                  <Link to="/appointments">Database</Link>
                </li>
                <li>
                  <Link to="/appointments">Config</Link>
                </li>
                <li>
                  <Link to="/appointments">About</Link>
                </li>
              </div>
            </ul>
          </li>
          <li>
            <Link to="/login" className="logout">
              <i className="icon-logout"></i>
              <span onClick={handleLogout}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>{" "}
    </div>
  );
};

export default Sidebar;
