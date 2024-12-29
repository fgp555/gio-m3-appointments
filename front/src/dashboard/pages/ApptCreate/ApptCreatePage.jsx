import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, set, isSameDay } from "date-fns";
import "./ApptCreatePage.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import apiServices from "../../../services/apiServices";
import TableApptComponent from "../../components/TableApptComponent/TableApptComponent";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ApptCreatePage = () => {
  const [selectedDay123, setSelectedDay] = useState(new Date());
  const [selectedRoles, setSelectedRoles] = useState({ patientId: "2", professionalId: "11" });
  const [newAppointment, setNewAppointment] = useState({
    description: "Terapia de rehabilitación para fractura de brazo",
    date: selectedDay123,
    time: format(new Date(), "HH:mm"), // Hora actual por defecto
  });

  const [selectedCount, setSelectedCount] = useState(() => {
    const savedCount = localStorage.getItem("selectedCount");
    return savedCount ? parseInt(savedCount, 10) : 3; // Predeterminado a 3
  });

  const [latestAppointments, setLatestAppointments] = useState([]);

  const handleSelectRolesChange = (newSelectRoles) => {
    setSelectedRoles(newSelectRoles);
  };

  const getAppointmentsLastCount = async () => {
    try {
      const response = await apiServices.fetchAppointmentsLastCount(selectedCount);
      setLatestAppointments(response);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    getAppointmentsLastCount();
  }, [selectedCount]);

  const handleCreateAppt = async (e) => {
    e.preventDefault();
    try {
      const { description, date, time } = newAppointment;

      // Validar que la hora seleccionada sea válida
      const currentDateTime = new Date();
      const selectedDateTime = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00`);
      if (selectedDateTime < currentDateTime) {
        throw new Error("La hora seleccionada debe ser mayor o igual a la hora actual.");
      }

      const localDateTime = `${format(date, "yyyy-MM-dd")}T${time}:00`;
      const formattedDate = new Date(localDateTime);

      const appointmentData = {
        date: formattedDate.toISOString(),
        description: description,
        patient: {
          id: selectedRoles.patientId,
        },
        professional: {
          id: selectedRoles.professionalId,
        },
      };

      await apiServices.createAppointment(appointmentData);
      await getAppointmentsLastCount();
      console.log("Cita creada exitosamente");

      Swal.fire({
        icon: "success",
        title: "¡Cita creada exitosamente!",
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        background: "#28a745",
        color: "#fff",
        iconColor: "#fff",
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error al crear la cita:", err);

      Swal.fire({
        icon: "error",
        title: `Error al crear la cita: ${err.message}`,
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        background: "#dc3545",
        color: "#fff",
        iconColor: "#fff",
        timerProgressBar: true,
      });
    }
  };

  // Función para determinar si es un día hábil (lunes a viernes)
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Excluye domingo (0) y sábado (6)
  };

  // Función para obtener el siguiente día hábil
  const getNextWeekday = (date) => {
    let nextDay = date;
    while (!isWeekday(nextDay)) {
      nextDay = addDays(nextDay, 1); // Incrementa el día hasta encontrar un día hábil
    }
    return nextDay;
  };

  const filterTime = (time) => {
    const selectedDate = set(new Date(), {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: 0,
    });

    const isSameDay2 = isSameDay(new Date(), newAppointment.date);
    return !isSameDay2 || selectedDate >= new Date(); // Permite todas las horas si no es el día actual
  };

  const [view, setView] = useState("month");

  const handleViewChange = (view) => {
    setView(view);
  };

  useEffect(() => {
    localStorage.setItem("selectedCount", selectedCount);
  }, [selectedCount]);

  const handleChange = (e) => {
    setSelectedCount(parseInt(e.target.value, 10) || 0); // Asegura que el valor sea un número
  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto"; // Resetea la altura primero
    textarea.style.height = textarea.scrollHeight + "px"; // Ajusta la altura según el contenido
  };

  return (
    <div className="ApptCalendarContainer ApptCreatePage">
      <aside className="calendar_section">
        <h1>Crear Cita</h1>
        <br />
        <form onSubmit={handleCreateAppt}>
          <div className="DatePicker DatePicker_Container">
            <DatePicker
              selected={new Date(`${format(newAppointment.date, "yyyy-MM-dd")}T${newAppointment.time}:00`)}
              onChange={(date) => {
                const formattedTime = format(date, "HH:mm");
                setNewAppointment({ ...newAppointment, date, time: formattedTime });
              }}
              inline
              dateFormat="Pp"
              minDate={new Date()}
              filterDate={isWeekday}
              required
            />
            <DatePicker
              selected={new Date(`${format(newAppointment.date, "yyyy-MM-dd")}T${newAppointment.time}:00`)}
              onChange={(date) => {
                const formattedTime = format(date, "HH:mm");
                setNewAppointment({ ...newAppointment, date, time: formattedTime });
              }}
              inline
              // filterTime={filterTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Hora"
              dateFormat="h:mm aa"
              minTime={new Date(new Date().setHours(7, 0, 0, 0))}
              maxTime={new Date(new Date().setHours(19, 0, 0, 0))}
            />
          </div>

          <div>
            <p className="date-time-paragraph">
              <span className="date"> {format(newAppointment.date, "yyyy-MM-dd")} </span>
              <span className="time"> {newAppointment.time} </span>
            </p>
          </div>
        </form>
      </aside>
      <aside>
        <div className="add-account">
          <Link to="/add-professionals" className="add-professionals">
            <button>Agregar Professional</button>
          </Link>
          <Link to="/add-professionals" className="add-professionals">
            <button>Agregar Paciente</button>
          </Link>
        </div>
        <div className="inputs_container">
          <SelectComponent
            onSelectRolesChange={handleSelectRolesChange}
            defaultRoles={selectedRoles}
            //
          />
          {/* Input para la Description */}
          <label>Descripción</label>
          <textarea
            className="description"
            //
            value={newAppointment.description}
            required
            placeholder="Description"
            onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
            onInput={(e) => autoResize(e.target)}
          ></textarea>
          <button type="button" onClick={handleCreateAppt} className="btn_handleCreateAppt">
            Agregar
          </button>
        </div>
        <section className="buttons_filters">
          {/* <button className={view === "day" ? "active" : ""} onClick={() => handleViewChange("day")}>
            Día
          </button>
          <button className={view === "week" ? "active" : ""} onClick={() => handleViewChange("week")}>
            Semana
          </button>
          <button className={view === "month" ? "active" : ""} onClick={() => handleViewChange("month")}>
            Mes
          </button> */}
          <p>Ultimas Citas agregadas</p>

          {/* Input para seleccionar el número de citas */}
          <span>
            <span className="input-number-container">
              <span
                //
                type="button"
                className="btn-decrement"
                onClick={() => setSelectedCount((prev) => Math.max(0, prev - 1))}
              >
                -
              </span>
              <input
                //
                id="selectedCount"
                type="number"
                value={selectedCount}
                onChange={handleChange}
                min="0"
                className="input-number"
              />
              <span
                //
                type="button"
                className="btn-increment"
                onClick={() => setSelectedCount((prev) => prev + 1)}
              >
                +
              </span>
            </span>
          </span>
        </section>

        <TableApptComponent
          //
          appoinmentData={latestAppointments}
          viewProps={view}
          handleUpdateAppt={getAppointmentsLastCount}
        />
      </aside>
    </div>
  );
};

export default ApptCreatePage;
