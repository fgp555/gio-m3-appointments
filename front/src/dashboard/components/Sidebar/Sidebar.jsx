import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { cleanUser } from "../../../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [subMenus, setSubMenus] = useState({});
  const [activeMenu, setActiveMenu] = useState(""); // Estado para el menú activo
  const sidebarRef = useRef(null); // Referencia al Sidebar
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar dispositivos móviles

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
          setSubMenus({}); // Cierra todos los submenús si estamos en móvil
        }
      }
    };

    const handleScroll = () => {
      if (isMobile) {
        setSubMenus({}); // Cierra los submenús al hacer scroll solo en dispositivos móviles
      }
    };

    // Establece el tamaño de la pantalla
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true); // Detecta dispositivos móviles
      } else {
        setIsMobile(false); // En dispositivos no móviles
      }
    };

    // Agrega los event listeners
    document.body.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile); // Detecta cambios de tamaño

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
    // setSubMenus({}); // Cierra todos los submenús
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
            <Link to="/appointments" onClick={() => handleMenuClick("home")}>
              <i className="icon-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className={activeMenu === "dashboard" ? "active" : ""}>
            <Link to="/appointments" onClick={() => handleMenuClick("dashboard")}>
              <i className="icon-dashboard"></i>
              <span>Dashboard</span>
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
                <li className={activeMenu === "create" ? "active" : ""}>
                  <Link to="/appt-create" onClick={() => handleMenuClick("create")}>
                    Create
                  </Link>
                </li>
                <li className={activeMenu === "calendar" ? "active" : ""}>
                  <Link to="/appointments" onClick={() => handleMenuClick("calendar")}>
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
                <li className={activeMenu === "profesionals" ? "active" : ""}>
                  <Link to="/professionals" onClick={() => handleMenuClick("profesionals")}>
                    Professionals
                  </Link>
                </li>
                <li className={activeMenu === "patiens" ? "active" : ""}>
                  <Link to="/appointments?2" onClick={() => handleMenuClick("patiens")}>
                    Patiens
                  </Link>
                </li>
                <li className={activeMenu === "admin" ? "active" : ""}>
                  <Link to="/appointments?3" onClick={() => handleMenuClick("admin")}>
                    Admin
                  </Link>
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
                <li className={activeMenu === "database" ? "active" : ""}>
                  <Link to="/appointments" onClick={() => handleMenuClick("database")}>
                    Database
                  </Link>
                </li>
                <li className={activeMenu === "config" ? "active" : ""}>
                  <Link to="/appointments" onClick={() => handleMenuClick("config")}>
                    Config
                  </Link>
                </li>
                <li className={activeMenu === "about" ? "active" : ""}>
                  <Link to="/appointments" onClick={() => handleMenuClick("about")}>
                    About
                  </Link>
                </li>
              </div>
            </ul>
          </li>
          <li className="logout-container">
            <Link to="/login" className="logout">
              <i className="icon-logout"></i>
              <span onClick={handleLogout}>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
