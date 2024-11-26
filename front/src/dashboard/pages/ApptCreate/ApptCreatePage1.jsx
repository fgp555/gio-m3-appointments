import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "./ApptCreatePage.css";
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import apiServices from "../../../services/apiServices";

const ApptCreatePage = () => {
  const [selectedDay123, setSelectedDay] = useState(new Date());
  const [selectedRoles, setSelectedRoles] = useState({ patientId: "3", doctorId: "7" });
  const [newAppointment, setNewAppointment] = useState({
    description: "description 123",
    date: selectedDay123,
    time: "09:00",
  });

  const handleSelectRolesChange = (newSelectRoles) => {
    setSelectedRoles(newSelectRoles);
    console.log("Estado actualizado desde el hijo:", newSelectRoles);
  };

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
    <>
      <div className="AppointmentsPage">
        <>
          <form onSubmit={handleCreateAppt}>
            <div>
              <DatePicker
                selected={newAppointment.date}
                onChange={(date) => setNewAppointment({ ...newAppointment, date })}
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
              <SelectComponent
                onSelectRolesChange={handleSelectRolesChange}
                defaultRoles={selectedRoles}
                //
              />
              <label>Description</label>
              <input type="text" value={newAppointment.description} onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })} />
            </div>
            <div>
              <button type="submit">Add</button>
            </div>
          </form>
          <pre>{JSON.stringify(newAppointment, null, 2)}</pre>
        </>
      </div>
    </>
  );
};

export default ApptCreatePage;
