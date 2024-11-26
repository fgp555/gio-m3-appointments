import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [subMenus, setSubMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(""); // Estado para el menú activo
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Detecta clics fuera del Sidebar y cierra los submenús solo en dispositivos móviles
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        if (isMobile) {
          setSubMenus({});
        }
      }
    };

    const handleScroll = () => {
      if (isMobile) {
        setSubMenus({});
      }
    };

    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Agrega los event listeners
    document.body.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    // Chequea el tamaño de la pantalla al cargar
    checkMobile();

    // Cleanup al desmontar el componente
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  // Función para manejar el clic en el menú
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName); // Actualiza el menú activo
    setSubMenus({}); // Cierra todos los submenús
  };

  return (
    <div className="sidebar_container" ref={sidebarRef}>
      <nav id="sidebar" className={sidebar ? "" : "close"}>
        <ul>
          <li>
            <span className="logo">CREFI DASHBOARD</span>
            <button onClick={toggleSidebar} id="toggle-btn" className={sidebar ? "" : "rotate"}>
              <i className="icon-angle-double-left"></i>
            </button>
          </li>
          <li className={activeMenu === "home" ? "active" : ""}>
            {" "}
            {/* Aplica la clase active */}
            <a href="/" onClick={() => handleMenuClick("home")}>
              <div className="icon-home"></div>
              <span>Home</span>
            </a>
          </li>
          <li className={activeMenu === "dashboard" ? "active" : ""}>
            <a href="#" onClick={() => handleMenuClick("dashboard")}>
              <i className="icon-dashboard"></i>
              <span>Dashboard</span>
            </a>
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
                  <Link to="/appt-create" onClick={() => handleMenuClick("appointments")}>
                    Create
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("appointments")}>
                    Calendar
                  </Link>
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
                  <Link to="/appointments" onClick={() => handleMenuClick("accounts")}>
                    Profesionals
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("accounts")}>
                    Patiens
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("accounts")}>
                    Admin
                  </Link>
                </li>
              </div>
            </ul>
          </li>

          <li>
            <button onClick={() => toggleSubMenu("TodoListMenu")} className={`dropdown-btn ${subMenus.TodoListMenu ? "rotate" : ""}`}>
              <i className="icon-tools"></i>
              <span>Tools</span>
              <i className="icon-angle-down"></i>
            </button>
            <ul className={`sub-menu ${subMenus.TodoListMenu ? "show" : ""}`}>
              <div>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("tools")}>
                    Database
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("tools")}>
                    Config
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" onClick={() => handleMenuClick("tools")}>
                    About
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li>
            <Link to="/login" className="logout" onClick={handleLogout}>
              <i className="icon-logout"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
