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

        
          <div className={styles["page-content"]}>
            
              <Home />

              <MisTurnos />
          </div>
      </div>
  );
}

export default App;
