import React from "react";
import styles from "./About.module.css";

import kinesiologo1 from "./../../assets/kinesiologo1.png";
import kinesiologo2 from "./../../assets/kinesiologo2.png";
import kinesiologo3 from "./../../assets/kinesiologo3.png";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Sobre Nosotros</h1>
      <p className={styles.description}>
        Bienvenidos a nuestro centro de kinesiología, donde nos especializamos en la atención y rehabilitación de pacientes. 
        Con un equipo de profesionales altamente capacitados, Nuestro objetivo es proporcionar un cuidado integral y
        personalizado, asegurando que cada paciente reciba el tratamiento adecuado para su recuperación y bienestar.
      </p>
      <div className={styles.team}>
        <h2 className={styles.subtitle}>Nuestro Equipo esta formado</h2>
        <div className={styles.member}>
          <img src={kinesiologo1} alt="Licenciado Rodríguez Matías" className={styles.photo} />
          <div className={styles.info}>
            <h3 className={styles.name}>Licenciado Rodríguez Matías</h3>
            <p className={styles.specialty}>Especialista en Deporte</p>
            <p className={styles.bio}>
              Licenciado Rodríguez Matías se especializa en la rehabilitación de lesiones deportivas. Con su enfoque personalizado y su compromiso con la excelencia, ayuda a
              deportistas a recuperarse y mejorar su rendimiento.
            </p>
          </div>
        </div>
        <div className={styles.member}>
          <img src={kinesiologo2} alt="Licenciada Martínez Russo Giovanna" className={styles.photo} />
          <div className={styles.info}>
            <h3 className={styles.name}>Licenciada Martínez Russo Giovanna</h3>
            <p className={styles.specialty}>Especialista en RPG, Drenaje Linfático Manual y Pilates</p>
            <p className={styles.bio}>
              Licenciada Martínez Russo Giovanna cuenta con experiencia en Reeducación Postural Global (RPG), drenaje linfático y Pilates. Su dedicación y conocimientos avanzados
              en estas áreas son fundamentales para nuestro equipo.
            </p>
          </div>
        </div>
        <div className={styles.member}>
          <img src={kinesiologo3} alt="Licenciado Rodríguez Gonzalo" className={styles.photo} />
          <div className={styles.info}>
            <h3 className={styles.name}>Licenciado Rodríguez Gonzalo</h3>
            <p className={styles.specialty}>Especialista en Osteopatía</p>
            <p className={styles.bio}>
              Licenciado Rodríguez Gonzalo es experto en osteopatía, utilizando técnicas avanzadas para tratar diversas condiciones musculoesqueléticas. Su enfoque holístico y su
              pasión por el bienestar del paciente aseguran tratamientos efectivos y una pronta recuperación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
