import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

const NavBar = () => {
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
                        <Link to="/mis-turnos">MIS TURNOS</Link>
                    </li>
                    <li>
                        <Link to="/about">ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/contact">CONTACT</Link>
                    </li>
                </ul>
            </div>
            
            <div className={styles.avatarContainer}>
                <img src={avatar} alt="Perfil del Paciente" className={styles.avatar} />
            </div>
        </nav>
    );
};

export default NavBar;
