import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { cleanAppointments } from "../../redux/userAppointmentsSlice";
import { cleanUser } from "../../redux/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(cleanUser());
    dispatch(cleanAppointments());
    navigate("/login");
  };

  const isLogin = useSelector((state) => state.user.login);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Consultorio Logo" className={styles.logo} />
      </div>

      <div className={styles.navListContainer}>
        <ul className={styles.navList}>
          <li>
            <Link to="/">HOME</Link>
          </li>

          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>

          {isLogin ? (
            <>
              <li>
                <Link to="/dashboard">DASHBOARD</Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`${styles.actionButton} ${styles.logout}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevenir redirección
                    handleLogout(); // Llamar a la función de logout
                  }}
                >
                  LOGOUT
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className={styles.actionButton}>
                  REGISTER
                </Link>
              </li>
              <li>
                <Link to="/login" className={styles.actionButton}>
                  LOGIN
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* <pre>{JSON.stringify(userSelector, null, 2)}</pre> */}

      <div className={styles.avatarContainer}>
        <img src={avatar} alt="Perfil del Paciente" className={styles.avatar} />
      </div>
    </nav>
  );
};

export default NavBar;
