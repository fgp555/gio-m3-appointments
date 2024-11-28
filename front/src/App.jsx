import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicLayout from "./layouts/PublicLayout";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./views/Home/Home";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import DashboardLayout from "./dashboard/layout/DashboardLayout";
// import Temp from "./dashboard/pages/AppointmentsPage/AppointmentsPage";
import "./App.css";
import ApptCreatePage from "./dashboard/pages/ApptCreate/ApptCreatePage";
import ApptListPage from "./dashboard/pages/AppointmentsPage/ApptListPage";
import ProfessionalsPage from "./dashboard/pages/ProfessionalsPage/ProfessionalsPage";
import AddProfessionalPage from "./dashboard/pages/AddProfessionalPage/AddProfessionalPage";

const NotFound = () => (
  <div>
    <h1>404</h1>
    <p>La página que buscas no existe.</p>
  </div>
);

const App = () => {
  const stateUser = useSelector((state) => state.user);

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/register"
        element={
          <PublicLayout>
            <Register />
          </PublicLayout>
        }
      />
      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <Contact />
          </PublicLayout>
        }
      />
      <Route path="*" element={<NotFound />} />

      {/* Rutas Privadas */}
      <Route
        path="/mis-turnos"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <MisTurnos />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ApptListPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appt-create"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ApptCreatePage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/professionals"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ProfessionalsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/add-professionals"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <AddProfessionalPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
