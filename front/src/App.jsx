import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import TurnoParams from "./components/TurnoParams";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import AppointmentsPage from "./views/AppointmentsPage/AppointmentsPage";

// Página 404
const NotFound = () => (
  <div className={styles["not-found"]}>
    <h1>404</h1>
    <p>La página que buscas no existe.</p>
  </div>
);

const App = () => {
  const stateUser = useSelector((state) => state.user);
  console.log("userSelector", stateUser);
  return (
    <>
      {!stateUser.login ? <NavBar /> : <Sidebar />}
      {/* <NavBar /> */}
      {/* <Sidebar /> */}
      <main className={"page-content-app"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mis-turnos"
            element={
              <PrivateRoute>
                {/* <MisTurnos /> */}
                <AppointmentsPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/AppointmentsPage"
            element={
              <PrivateRoute>
                <div className="container">
                  <AppointmentsPage />
                </div>
              </PrivateRoute>
            }
          /> */}
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
          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
