import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import apiServices from "../../../services/apiServices";
import "./TableApptComponent.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const TableApptComponent = ({ appoinmentData, viewProps, handleUpdateAppt }) => {
  const [view, setView] = useState("month");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null); // Almacena la cita que se está editando
  const [editedDate, setEditedDate] = useState(new Date()); // Fecha editada
  const [editedTime, setEditedTime] = useState(""); // Hora editada
  const [editedDescription, setEditedDescription] = useState(""); // Descripción editada

  useEffect(() => {
    if (viewProps) {
      setView(viewProps);
    }
  }, [viewProps]);

  // Función para abrir el modal de edición
  const openEditModal = (appointment) => {
    setCurrentAppointment(appointment);
    setEditedDate(new Date(appointment.date));
    setEditedTime(appointment.time);
    setEditedDescription(appointment.description || ""); // Usar descripción actual de la cita
    setIsEditModalOpen(true);
  };

  // Función para actualizar la cita
  const handleUpdateAppointment = async () => {
    const updatedAppointment = {
      ...currentAppointment,
      date: editedDate,
      time: editedTime,
      description: editedDescription,
    };

    try {
      await apiServices.updateAppointment(updatedAppointment);

      Swal.fire({
        title: "¡Actualizada!",
        text: "La cita ha sido actualizada exitosamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      handleUpdateAppt(); // Actualiza el estado en el componente padre
      setIsEditModalOpen(false); // Cierra el modal
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `No se pudo actualizar la cita: ${error.message}`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      console.error("Error al actualizar la cita:", error.message);
    }
  };

  // Función para manejar la cancelación del modal
  const handleCancelEdit = () => {
    setIsEditModalOpen(false); // Cierra el modal
    setCurrentAppointment(null); // Limpia la cita actual
    setEditedDate(new Date()); // Restablece la fecha
    setEditedTime(""); // Restablece la hora
    setEditedDescription(""); // Restablece la descripción
  };

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

    // Determinar el título según el género
    const professionalTitle = professional.gender === "woman" ? `la ${professional.title}` : `el ${professional.title}`;

    // Formatear la fecha y hora
    const formattedDate = new Date(date).toLocaleString("es-ES", {
      weekday: "long", // Mostrar el día de la semana
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Construir el mensaje
    const message =
      `Hola *${patient.firstName} ${patient.lastName}*,\n\n` +
      `Le recordamos que tiene una cita programada:\n\n` +
      `*Fecha:* ${formattedDate}\n` +
      `*${professional.title}:*  ${professional.firstName} ${professional.lastName}\n` +
      `*Descripción:* ${description}\n\n` +
      `Si tiene alguna duda o necesita reprogramar, no dude en contactarnos. Estamos aquí para ayudarle.\n\n` +
      `Saludos,\n*Clínica Fisio Terapia*`;

    // Codificar el mensaje para WhatsApp
    const encodedMessage = encodeURIComponent(message).replace(/%E2%80%8D/g, ""); // Elimina caracteres invisibles si los hay

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
                          <i className="icon-doctor"></i> {appt.professional.title} {appt.professional.firstName}{" "}
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
                          <button onClick={() => openEditModal(appt)}>
                            <i className="icon-pencil"></i>
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
        <section>
          {/* Aquí va la lógica para mostrar las citas */}
          {isEditModalOpen && currentAppointment && (
            <div className="edit-modal">
              <aside className="modal-content">
                <h3>Editar cita</h3>
                <div>
                  <input type="time" value={editedTime} onChange={(e) => setEditedTime(e.target.value)} />
                  <DatePicker selected={editedDate} onChange={(date) => setEditedDate(date)} locale={es} dateFormat="dd/MM/yyyy" />
                </div>
                <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} placeholder="Descripción de la cita" />
                <div>
                  <button onClick={handleUpdateAppointment}>Guardar cambios</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </aside>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default TableApptComponent;
