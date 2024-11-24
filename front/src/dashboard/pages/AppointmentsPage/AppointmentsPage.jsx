import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, isSameDay, isSameWeek, isSameMonth, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import "./AppointmentsPage.css";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../../../redux/userAppointmentsSlice";
import apiServices from "../../../services/apiServices";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [view, setView] = useState("day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    description: "description 123",
    date: selectedDay,
    time: "09:00",
  });

  const appoinmentSelector = useSelector((state) => state.appointments);
  const userSelector = useSelector((state) => state.user);
  const userId = userSelector?.user?.id;

  const dispatch = useDispatch();

  const fetchAppointmentsFromApi = async () => {
    try {
      const appointments = await apiServices.fetchAppointments();
      setAppointments(appointments);
      dispatch(fetchAppointments(appointments));
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentsFromApi();
  }, [userId]);
  // ==========  ==========
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitCreateAppt = async (e) => {
    e.preventDefault();

    try {
      const { description, date, time } = newAppointment;

      // Combinar la fecha seleccionada y la hora proporcionada en el formato requerido
      const formattedDate = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00.000Z`);

      const appointmentData = {
        date: formattedDate.toISOString(),
        description,
        userId: 1, // Asegúrate de que `userId` esté definido correctamente
      };

      console.log("Payload to send:", appointmentData);

      // Enviar la cita al backend
      const response = await apiServices.createAppointment(appointmentData);
      console.log("Appointment created successfully:", response);

      // Limpiar el formulario
      setNewAppointment({
        description: "description 123",
        date: new Date(),
        time: "09:00",
      });

      // Actualizar la lista de citas
      fetchAppointmentsFromApi();
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  };

  // Handle deleting an appointment
  const handleDeleteAppointment = (id) => {
    // fetch(`http://localhost:5000/appointments/${id}`, {
    fetch(`/api/appointments/cancel/${id}`, {
      method: "PUT",
    })
      .then(() => {
        // setAppointments(appointments.filter((appt) => appt.id !== id));
        getUserAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // Lunes a Viernes
  };

  // Filter appointments based on the selected view
  const filteredAppointments = appointments.filter((appt) => {
    const appointmentDate = new Date(appt.date);
    if (view === "day") {
      return isSameDay(appointmentDate, selectedDay);
    } else if (view === "week") {
      // Get the start and end of the selected week
      const weekStart = startOfWeek(selectedDay, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(selectedDay, { weekStartsOn: 1 });
      return appointmentDate >= weekStart && appointmentDate <= weekEnd;
    } else if (view === "month") {
      // Get the start and end of the selected month
      const monthStart = startOfMonth(selectedDay);
      const monthEnd = endOfMonth(selectedDay);
      return appointmentDate >= monthStart && appointmentDate <= monthEnd;
    }
    return false;
  });

  // Helper function to get active button style
  const getButtonStyle = (viewType) => {
    return view === viewType
      ? { backgroundColor: "#4CAF50", color: "white" } // Green color for active view
      : {};
  };

  return (
    <>
      {/* <pre>{JSON.stringify(appoinmentSelector, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(appointments, null, 2)}</pre> */}
      <div className="AppointmentsPage">
        <h2>Calendario de Citas</h2>

        {/* Buttons to switch between views */}
        <div style={{ marginBottom: "1em" }}>
          <button onClick={() => setView("day")} style={getButtonStyle("day")}>
            Día
          </button>
          <button onClick={() => setView("week")} style={getButtonStyle("week")}>
            Semana
          </button>
          <button onClick={() => setView("month")} style={getButtonStyle("month")}>
            Mes
          </button>
        </div>

        {/* Date Picker to select a specific day */}
        <div>
          <h3>Selecciona un día</h3>
          <DatePicker selected={selectedDay} onChange={(date) => setSelectedDay(date)} inline highlightDates={appointments.map((appt) => new Date(appt.date))} />
        </div>

        {/* Display appointments based on the selected view */}
        <div>
          <h3>
            Citas para {view === "day" && `el ${format(selectedDay, "MMMM d, yyyy")}`}
            {view === "week" && `la semana de ${format(selectedDay, "MMMM d")}`}
            {view === "month" && `el mes de ${format(selectedDay, "MMMM")}`}
          </h3>
          {filteredAppointments.length > 0 ? (
            <ul>
              {filteredAppointments.map((appt) => (
                <li key={appt.id}>
                  {/* {view === "day" && format(new Date(appt.date), "h:mm aa")}
                {view === "week" && `${format(new Date(appt.date), "EEE")} ${format(new Date(appt.date), "d")}`}
                {view === "month" && `${format(new Date(appt.date), "MMM d")} - ${format(new Date(appt.date), "h:mm aa")}`} —
                 */}
                  {/* ========== ========== */}
                  {view === "day" && format(new Date(appt.date), "h:mm aa", { locale: es })} {/* Only time for 'day' view */}
                  {view === "week" && `${format(new Date(appt.date), "EEE", { locale: es })} ${format(new Date(appt.date), "d", { locale: es })}`}{" "}
                  {/* Day of the week and date for 'week' view */}
                  {view === "month" && `${format(new Date(appt.date), "MMM d", { locale: es })} - ${format(new Date(appt.date), "h:mm aa", { locale: es })}`}{" "}
                  {/* Full date and time for 'month' view */}
                  <strong>{appt.description}</strong>
                  <button onClick={() => handleDeleteAppointment(appt.id)}>Cancel</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay citas para esta vista.</p>
          )}
        </div>

        {/* Modal to create a new appointment */}
        <div className="AppointmentsPage">
          <button onClick={() => setIsModalOpen(true)}>Agregar Cita</button>
        </div>
        {isModalOpen && (
          <>
            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}></div>

            <div className="modal">
              <h3>Crear nueva cita</h3>
              <form onSubmit={handleSubmitCreateAppt}>
                <div>
                  <label>Descripción</label>
                  <input type="text" value={newAppointment.description} onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })} />
                </div>
                <div>
                  <label>Fecha y Hora</label>
                  <DatePicker
                    selected={newAppointment.date}
                    onChange={(date) => setNewAppointment({ ...newAppointment, date })}
                    showTimeSelect
                    timeIntervals={30}
                    timeCaption="Hora"
                    dateFormat="Pp"
                    minDate={new Date()} // Permitir seleccionar a partir de hoy
                    filterDate={isWeekday}
                    minTime={new Date(new Date().setHours(9, 0, 0, 0))} // Limitar a las 9 AM
                    maxTime={new Date(new Date().setHours(17, 0, 0, 0))} // Limitar a las 5 PM
                    required
                  />
                </div>
                <div>
                  <button type="submit">Crear Cita</button>
                  <button onClick={() => setIsModalOpen(false)}>Cerrar</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AppointmentsPage;
