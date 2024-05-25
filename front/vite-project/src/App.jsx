import React from 'react';
import Home from "./views/Home/Home";
import MisTurnos from './views/MisTurnos/MisTurnos';
import styles from './App.module.css';
import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Register from './views/Register/Register';
import Login from './views/Login/Login';

const App = () => {
    return (
        <div>
             <NavBar />


            <div className={styles["page-content"]}>

                {/* <Home />

                <MisTurnos /> */}
                <Register />
                {/* <Login/> */}
            </div>
        </div>
    );
}

export default App;
