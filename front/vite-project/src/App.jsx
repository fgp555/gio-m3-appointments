import React from 'react';
import Home from "./views/Home/Home";
import MisTurnos from './views/MisTurnos/MisTurnos';
import styles from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import { Routes, Route } from 'react-router-dom';
import About from './views/About/About';
import Contact from './views/Contact/Contact';

const App = () => {
    return (
        <div>
            <NavBar />
            <div className={styles["page-content"]}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mis-turnos" element={<MisTurnos />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div >
    );
}

export default App;
