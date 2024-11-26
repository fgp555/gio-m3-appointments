import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay, isSameWeek, isSameMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
// import "./AppointmentsPage.css";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../../redux/userAppointmentsSlice";
import apiServices from "../../../services/apiServices";
import "./TableApptComponent.css";

const TableApptComponent = () => {
  const [view, setView] = useState("month");
  const [apptState123, setApptState123] = useState([
    {
      id: 10,
      date: "2025-12-01T10:00:00.000Z",
      description: "Annual check-up",
      status: "PENDING",
      patient: {
        id: 2,
        firstName: "María Fernanda",
        lastName: "Fernández García",
      },
      doctor: {
        id: 3,
        firstName: "Pedro Javier",
        lastName: "Ramírez Gómez",
      },
    },
    {
      id: 7,
      date: "2024-11-29T21:22:13.338Z",
      description: "Terapia de rehabilitación después de fractura de brazo",
      status: "PENDING",
      patient: {
        id: 1,
        firstName: "Luis Alberto",
        lastName: "Martínez López",
      },
      doctor: {
        id: 2,
        firstName: "María Fernanda",
        lastName: "Fernández García",
      },
    },
  ]);

  const cancelAppt = (id) => {
    console.log("cancelAppt", id);
    return;
    fetch(`/api/appointments/cancel/${id}`, {
      method: "PUT",
    })
      .then(() => {
        // getUserAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const deleteAppt = (id) => {
    console.log("deleteAppt", id);
    return;

    fetch(`/api/appointments/cancel/${id}`, {
      method: "PUT",
    })
      .then(() => {
        // getUserAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  return (
    <>
      <div className="TableApptComponent">
        <section>
          <div>
            {apptState123.length > 0 ? (
              <ul className="appt_list_container">
                {apptState123.map((appt) => (
                  <li key={appt.id}>
                    {/* {view === "day" && format(new Date(appt.date), "h:mm aa")}
                {view === "week" && `${format(new Date(appt.date), "EEE")} ${format(new Date(appt.date), "d")}`}
                {view === "month" && `${format(new Date(appt.date), "MMM d")} - ${format(new Date(appt.date), "h:mm aa")}`} —
                 */}
                    {/* ========== ========== */}
                    <section className="appt_list">
                      <aside className="info">
                        <div className="name">
                          <i className="icon-user"></i>
                          <strong> {appt.patient.firstName} </strong>
                          <i className="mobile_none lastName">{appt.doctor.lastName} </i>
                        </div>
                        <p>
                          <i className="icon-clock"></i>
                          <b className="date_time">
                            {view === "day" && format(new Date(appt.date), "h:mm aa", { locale: es })} {/* Only time for 'day' view */}
                            {view === "week" && `${format(new Date(appt.date), "EEE", { locale: es })} ${format(new Date(appt.date), "d", { locale: es })}`}{" "}
                            {/* Day of the week and date for 'week' view */}
                            {view === "month" && `${format(new Date(appt.date), "EEE dd MMM", { locale: es })} - ${format(new Date(appt.date), "h:mm aa", { locale: es })}`}{" "}
                            {/* Full date and time for 'month' view */}
                          </b>
                        </p>
                        <p>
                          <i className="icon-doctor"></i> {appt.doctor.firstName}{" "}
                        </p>
                        <p className="description">
                          <i className="icon-book"></i>
                          <b>{appt.description} </b>
                        </p>
                      </aside>
                      <aside className="buttons">
                        <p>{appt.status} </p>
                        <button onClick={() => cancelAppt(appt.id)}>Cancel</button>
                        <button onClick={() => deleteAppt(appt.id)}>Delete</button>
                      </aside>
                    </section>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay citas para esta vista.</p>
            )}
          </div>
        </section>
      </div>

      <hr />
      <hr />
      <hr />
      <hr />
    </>
  );
};

export default TableApptComponent;
