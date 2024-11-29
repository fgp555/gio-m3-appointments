import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, set } from "date-fns";
import "./ApptCreatePage.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import apiServices from "../../../services/apiServices";
import TableApptComponent from "../../components/TableApptComponent/TableApptComponent";

const ApptCreatePage = () => {
  const [selectedDay123, setSelectedDay] = useState(new Date());
  const [selectedRoles, setSelectedRoles] = useState({ patientId: "3", professionalId: "7" });
  const [newAppointment, setNewAppointment] = useState({
    description: "description 123",
    date: selectedDay123,
    time: "09:00",
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
      console.log("Appointment created successfully");
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
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
              // selected={selectedTime}
              // onChange={(date) => setSelectedTime(date)}
              showTimeSelect
              showTimeSelectOnly // Esto asegura que solo se muestre la selección de la hora
              timeIntervals={30} // Intervalo de 15 minutos entre las opciones de hora
              timeCaption="Hora"
              dateFormat="h:mm aa" // Formato de la hora (hora AM/PM)
              // dateFormat="Pp"
              minTime={new Date(new Date().setHours(9, 0, 0, 0))}
              maxTime={new Date(new Date().setHours(17, 0, 0, 0))}
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
        <div className="inputs_container">
          <SelectComponent
            onSelectRolesChange={handleSelectRolesChange}
            defaultRoles={selectedRoles}
            //
          />
          {/* Input para la Description */}
          <label>Description</label>
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
            Add
          </button>
        </div>
        <section className="buttons_filters">
          <button className={view === "day" ? "active" : ""} onClick={() => handleViewChange("day")}>
            Day
          </button>
          <button className={view === "week" ? "active" : ""} onClick={() => handleViewChange("week")}>
            Week
          </button>
          <button className={view === "month" ? "active" : ""} onClick={() => handleViewChange("month")}>
            Month
          </button>

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
