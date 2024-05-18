import React from 'react';
import Home from "./views/Home/Home";
import MisTurnos from './views/MisTurnos/MisTurnos';
import styles from './App.module.css';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';

const App = () => {
  return (
      <div>
          <NavBar />

          {/* Contenido de la página */}
          <div className={styles["page-content"]}>
              {/* Contenido dinámico basado en la ruta */}
              {/* Por ejemplo, para mostrar el componente Home */}
              <Home />

              <MisTurnos />
          </div>
      </div>
  );
}

export default App;
