import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import apiServices from "../../../services/apiServices";
import "./TableApptComponent.css";

const TableApptComponent = ({ apptState, handleViewChange, viewProps }) => {
  const [view, setView] = useState("month");

  useEffect(() => {
    if (viewProps) {
      setView(viewProps);
    }
  }, [viewProps]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const canceledAppointment = await apiServices.cancelAppointment(appointmentId);
      console.log("Appointment canceled successfully:", canceledAppointment);
    } catch (error) {
      console.error("Error canceling appointment:", error.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await apiServices.deleteAppointment(appointmentId);
      console.log("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };

  return (
    <>
      <div className="TableApptComponent">
        <section>
          <div>
            {apptState.length > 0 ? (
              <ul className="appt_list_container">
                {apptState.map((appt) => (
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
                        <button onClick={() => handleCancelAppointment(appt.id)}>Cancel</button>
                        <button onClick={() => handleDeleteAppointment(appt.id)}>Delete</button>
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
    </>
  );
};

export default TableApptComponent;
