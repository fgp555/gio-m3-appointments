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
import ProfUpdateParam from "./dashboard/pages/ProfessionalsPage/id-update/ProfUpdateParam";
import PatientsPage from "./dashboard/pages/PatientsPage/PatientsPage";
import AddPatientPage from "./dashboard/pages/PatientsPage/AddPatientPage/AddPatientPage";
import UpdatePatientsPage from "./dashboard/pages/PatientsPage/update/UpdatePatientsPage.";
import DatabaseBackupManager from "./dashboard/pages/DatabaseBackupManager/DatabaseBackupManager ";
import AboutSystem from "./dashboard/pages/about-system/AboutSystem";
import DashboardPage from "./dashboard/pages/dashboard/DashboardPage";

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
      <Route
        path="/professional/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ProfUpdateParam />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <PatientsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/create-patient"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <AddPatientPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/patient1/:id"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <UpdatePatientsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/db-backup-manager"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DatabaseBackupManager />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/about-system"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <AboutSystem />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
