import React from "react";
import "./DashboardPage.css";
import { useSelector } from "react-redux";
import TableApptComponent from "../../components/TableApptComponent/TableApptComponent";
import apiServices from "../../../services/apiServices";
import { Link, useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const userStore = useSelector((state) => state.user).user;
  // const appointmentsUser = userStore.appointmentsAsProfessional;
  const [appointmentsUser, setAppointmentsUser] = React.useState([]);

  const fetchUser = async () => {
    try {
      const res = await apiServices.fetchAppointmentsByProfessional(userStore.id);

      setAppointmentsUser(res);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="DashboardPage">
      <aside className="left">
        <section className="header">
          <h1 className="title">Bienvenido, {userStore.firstName}!</h1>
        </section>

        {/* Profile Card */}
        <section className="profile-card">
          <img src={userStore.image} alt={`${userStore.firstName} ${userStore.lastName}`} className="profile-image" />
          <h2>
            {userStore.firstName} {userStore.lastName}
          </h2>
          <p className="specialization">{userStore.specialization}</p>
          <p>{userStore.title}</p>
          <p>{userStore.email}</p>
          <p>{userStore.whatsapp}</p>
          <p className="bio">{userStore.bio}</p>
          <div>
            <Link to="/appt-create">
              <button>Agregar cita</button>
            </Link>
            <Link to={`/professional/${userStore.id}`}>
              <button>Editar perfil</button>
            </Link>
          </div>
        </section>
      </aside>

      {/* Table of Appointments */}
      <aside>
        <h3>Mis citas</h3>
        <TableApptComponent
          appoinmentData={appointmentsUser}
          viewProps="month" // Si necesitas un tipo específico de vista, puedes ajustarlo aquí
          handleUpdateAppt={fetchUser}
        />
      </aside>
      {/* <pre>{JSON.stringify(appointmentsUser, null, 2)}</pre> */}
    </div>
  );
};

export default DashboardPage;
