import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import TurnoParams from "./components/TurnoParams";

const App = () => {
  return (
    <div>
      <NavBar />
      <div className={styles["page-content"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mis-turnos"
            element={
              <PrivateRoute>
                <MisTurnos />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/turno/:id"
            element={
              <PrivateRoute>
                <TurnoParams />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
