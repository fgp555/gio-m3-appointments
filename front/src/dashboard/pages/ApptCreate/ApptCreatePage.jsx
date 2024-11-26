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
  const [selectedRoles, setSelectedRoles] = useState({ patientId: "3", doctorId: "7" });
  const [newAppointment, setNewAppointment] = useState({
    description: "description 123",
    date: selectedDay123,
    time: "09:00",
  });

  const [selectedCount, setSelectedCount] = useState(3);

  const [latestAppointments, setLatestAppointments] = useState([]);

  const handleSelectRolesChange = (newSelectRoles) => {
    setSelectedRoles(newSelectRoles);
    console.log("Estado actualizado desde el hijo:", newSelectRoles);
  };

  const getAppointmentsLastCount = async () => {
    try {
      const response = await apiServices.fetchAppointmentsLastCount(selectedCount);
      setLatestAppointments(response);
      console.log("Appointments fetched successfully:", response);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    getAppointmentsLastCount();
  }, []);

  const handleCreateAppt = async (e) => {
    e.preventDefault();
    try {
      const { description, date, time } = newAppointment;

      const formattedDate = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00.000Z`);
      const appointmentData = {
        date: formattedDate.toISOString(),
        description: description,
        patient: {
          id: selectedRoles.patientId,
        },
        doctor: {
          id: selectedRoles.doctorId,
        },
      };
      const response = await apiServices.createAppointment(appointmentData);
      console.log("Appointment created successfully:", response);
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5;
  };

  return (
    <div className="AppointmentsPage">
      <TableApptComponent />
      {/* <button onClick={getAppointmentsLastCount}>Button</button> */}
      {/* <pre>{JSON.stringify(latestAppointments, null, 2)}</pre> */}
      <input type="number" value={selectedCount} onChange={(e) => setSelectedCount(e.target.value)} />
      <form onSubmit={handleCreateAppt}>
        <div>
          <DatePicker
            selected={new Date(`${format(newAppointment.date, "yyyy-MM-dd")}T${newAppointment.time}:00`)}
            onChange={(date) => {
              const formattedTime = format(date, "HH:mm");
              setNewAppointment({ ...newAppointment, date, time: formattedTime });
            }}
            inline
            showTimeSelect
            timeIntervals={30}
            timeCaption="Hora"
            dateFormat="Pp"
            minDate={new Date()}
            filterDate={isWeekday}
            minTime={new Date(new Date().setHours(9, 0, 0, 0))}
            maxTime={new Date(new Date().setHours(17, 0, 0, 0))}
            required
          />
        </div>
        <div>
          <p className="date-time">
            <span className="date"> {format(newAppointment.date, "yyyy-MM-dd")} </span>
            <span className="time"> {newAppointment.time} </span>
          </p>
        </div>
        <div>
          <SelectComponent
            onSelectRolesChange={handleSelectRolesChange}
            defaultRoles={selectedRoles}
            //
          />
          <label>Descripción</label>
          <input type="text" value={newAppointment.description} onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })} />
        </div>
        <div>
          <button type="submit">Crear Cita</button>
        </div>
      </form>
      <pre>{JSON.stringify(newAppointment, null, 2)}</pre>
    </div>
  );
};

export default ApptCreatePage;
