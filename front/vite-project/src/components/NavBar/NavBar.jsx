import React from 'react';
import styles from "./NavBar.module.css"
import logo from "../../assets/logo.png"
import avatar from "../../assets/avatar.png"

const NavBar = () => {
    return (
        <nav className={styles.navbar}>

            <img src={logo} alt="Consultorio Logo" className={styles.logo} />
            <ul className={styles.navList}>
                <li>
                    <a href="/">HOME</a>
                </li>
                <li>
                    <a href="/mis-turnos">MIS TURNOS</a>
                </li>
                <li>
                    <a href="/about">ABOUT</a>
                </li>
                <li>
                    <a href="/contacto">CONTACTO</a>
                </li>
            </ul>
            <img src={avatar} alt="Perfil del Paciente" className={styles.avatar} />
        </nav>
    );
};

export default NavBar;
