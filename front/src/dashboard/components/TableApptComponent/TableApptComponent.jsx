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
      title: "¿Estás seguro?",
      text: "¿Quieres cancelar esta cita? Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantenerla",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmCancel.isConfirmed) return;

    try {
      const canceledAppointment = await apiServices.cancelAppointment(appointmentId);
      Swal.fire({
        title: "¡Cancelado!",
        text: "La cita ha sido cancelada exitosamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      handleUpdateAppt();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo cancelar la cita: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      console.error("Error al cancelar la cita:", error.message);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar esta cita? Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, mantenerla",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await apiServices.deleteAppointment(appointmentId);

      Swal.fire({
        title: "¡Eliminada!",
        text: "La cita ha sido eliminada exitosamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      handleUpdateAppt();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo eliminar la cita: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      console.error("Error al eliminar la cita:", error.message);
    }
  };

  const statusTranslation = {
    PENDING: "Pendiente",
    CANCELED: "Cancelada",
  };

  const handleWhatsapp = (appointment) => {
    const { patient, date, description, professional } = appointment;

    // Formatear la fecha
    const formattedDate = new Date(date).toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
    });

    // Construir el mensaje
    const message =
      `Hola ${patient.firstName} ${patient.lastName},\n\n` +
      `Le recordamos que tiene una cita programada el ${formattedDate} con ${professional.firstName} ${professional.lastName}.\n\n` +
      `Descripción: ${description}.\n\n` +
      `Si tiene alguna pregunta o necesita reprogramar, por favor contáctenos.`;

    // Codificar el mensaje para la URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);

    // Construir la URL de WhatsApp
    const whatsappURL = `https://wa.me/${patient.whatsapp}?text=${encodedMessage}`;

    // Abrir la ventana de WhatsApp
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <div className="TableApptComponent">
        {/* <pre>{JSON.stringify(appoinmentData, null, 2)}</pre> */}
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
                          <i className="mobile_none lastName">{appt.patient.lastName} </i>
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
                        <p className={`status ${appt.status}`}>{statusTranslation[appt.status] || appt.status}</p>
                        <button onClick={() => handleCancelAppointment(appt.id)}>Cancelar</button>
                        <div className="icons_container">
                          <button onClick={() => handleWhatsapp(appt)} className="whatsapp">
                            <i className="icon-whatsapp"></i>
                          </button>
                          <button onClick={() => handleDeleteAppointment(appt.id)} className="danger">
                            <i className="icon-trash"></i>
                          </button>
                        </div>
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
