import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import apiServices from "../../../services/apiServices";
import "./TableApptComponent.css";
import Swal from "sweetalert2";

const TableApptComponent = ({ appoinmentData, viewProps, handleUpdateAppt }) => {
  const [view, setView] = useState("month");

  useEffect(() => {
    if (viewProps) {
      setView(viewProps);
    }
  }, [viewProps]);

  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep it",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmCancel.isConfirmed) return;

    try {
      const canceledAppointment = await apiServices.cancelAppointment(appointmentId);
      Swal.fire({
        title: "Canceled!",
        text: "The appointment has been successfully canceled.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      handleUpdateAppt();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to cancel the appointment: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      console.error("Error canceling appointment:", error.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this appointment? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, keep it",
      background: "#222533", // Dark background color
      color: "#fff", // Text color in the modal
      customClass: {
        popup: "swal-dark-modal", // Custom class for the popup
      },
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await apiServices.deleteAppointment(appointmentId);

      Swal.fire({
        title: "Deleted!",
        text: "The appointment has been successfully deleted.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      handleUpdateAppt();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to delete the appointment: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Got it",
        background: "#222533", // Dark background color
        color: "#fff", // Text color in the modal
        customClass: {
          popup: "swal-dark-modal", // Custom class for the popup
        },
      });

      console.error("Error deleting appointment:", error.message);
    }
  };

  return (
    <>
      <div className="TableApptComponent">
        <section>
          <div>
            {appoinmentData.length > 0 ? (
              <ul className="appt_list_container">
                {appoinmentData.map((appt) => (
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
                          <i className="mobile_none lastName">{appt.professional.lastName} </i>
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
                          <i className="icon-doctor"></i> {appt.professional.firstName}{" "}
                        </p>
                        <p className="description">
                          <i className="icon-book"></i>
                          <b>{appt.description} </b>
                        </p>
                      </aside>
                      <aside className="buttons">
                        <p className={`status  ${appt.status}`}>{appt.status} </p>
                        <button onClick={() => handleCancelAppointment(appt.id)}>Cancel</button>
                        <button onClick={() => handleDeleteAppointment(appt.id)} className="danger">
                          Delete
                        </button>
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
