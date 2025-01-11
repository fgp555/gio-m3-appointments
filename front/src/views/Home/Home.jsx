// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./Home.module.css";

// const Home = () => {
//   return (
//     <div className={styles.homeContainer}>
//       <h1 className={styles.title}>¡Bienvenido a Nuestro Consultorio de Kinesiología!</h1>
//       <p className={styles.description}>
//         Ofrecemos una variedad de servicios especializados en kinesiología, incluyendo rehabilitación deportiva, terapia manual, y tratamiento de lesiones musculoesqueléticas.
//       </p>
//       <div className={styles.services}>
//         <h2>Servicios</h2>
//         <ul>
//           <li>Rehabilitación Deportiva</li>
//           <li>Terapia Manual</li>
//           <li>Tratamiento de Lesiones Musculoesqueléticas</li>
//           <li>Reeducación Postural Global (RPG)</li>
//           <li>Terapia de Masaje</li>
//           <li>Pilates terapeutico</li>
//         </ul>
//       </div>
//       <div className={styles.schedule}>
//         <h2>Horarios de Atención</h2>
//         <p>Lunes a Viernes</p>
//         <p>mañana 7:00am - 12:00pm </p>
//         <p>tarde 15:00pm - 19:00pm</p>
//       </div>
//       <div className={styles.actions}>
//         <Link to="/register" className={styles.actionButton}>
//           Registrarse
//         </Link>
//         <Link to="/login" className={styles.actionButton}>
//           Iniciar Sesión
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>¡Bienvenido a Nuestro Consultorio de Kinesiología!</h1>
      <p className={styles.description}>
        Ofrecemos una variedad de servicios especializados de kinesiología, incluyendo rehabilitación deportiva, terapia manual, y tratamiento de lesiones musculoesqueléticas.
      </p>
      <div className={styles.services}>
        <h2>Nuestros Tratamientos</h2>
        <ul>
          <li>Rehabilitación Deportiva</li>
          <li>Terapia Manual</li>
          <li>Tratamiento de Lesiones Musculoesqueléticas</li>
          <li>Reeducación Postural Global (RPG)</li>
          <li>Osteopatia</li>
          <li>Masajes descontracturantes</li>
          <li>Pilates terapéutico</li>
        </ul>
      </div>
      <div className={styles.schedule}>
        <h2>Horarios de Atención</h2>
        <p>Lunes a Viernes</p>
        <p>Mañana: 7:00am - 12:00pm</p>
        <p>Tarde: 3:00pm - 7:00pm</p>
      </div>
      <div className={styles.actions}>
        <Link to="/register" className={styles.actionButton}>
          Registrate
        </Link>
        <Link to="/login" className={styles.actionButton}>
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Home;

