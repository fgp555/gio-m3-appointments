import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import apiServices from "../../../services/apiServices";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [roles, setRoles] = useState({
    doctor: [],
    patient: [],
  });
  const [newAppointment, setNewAppointment] = useState({
    description: "",
    date: new Date(),
    time: "09:00",
    patientId: "",
    doctorId: "",
  });

  // Fetch roles dynamically
  const getUserByRole = async (role) => {
    try {
      const response = await apiServices.getApiUserByRole(role);
      return response;
    } catch (error) {
      console.error(`Error fetching users with role ${role}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchUsersByRoles = async () => {
      const newRoles = { ...roles };
      for (const role of ["doctor", "patient"]) {
        const data = await getUserByRole(role);
        newRoles[role] = data;
      }
      setRoles(newRoles);
    };
    fetchUsersByRoles();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmitCreateAppt = async (e) => {
    e.preventDefault();
    try {
      const { description, date, time, patientId, doctorId } = newAppointment;

      const formattedDate = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00.000Z`);

      const appointmentData = {
        date: formattedDate.toISOString(),
        description,
        patient: { id: Number(patientId) },
        doctor: { id: Number(doctorId) },
      };

      console.log("Payload to send:", appointmentData);

      const response = await apiServices.createAppointment(appointmentData);
      console.log("Appointment created successfully:", response);

      // Clear the form
      setNewAppointment({
        description: "",
        date: new Date(),
        time: "09:00",
        patientId: "",
        doctorId: "",
      });

      // Refresh appointments
      fetchAppointmentsFromApi();
    } catch (err) {
      console.error("Error creating appointment:", err);
    }
  };

  // Fetch appointments
  const fetchAppointmentsFromApi = async () => {
    try {
      const response = await apiServices.fetchAppointments();
      setAppointments(response);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  return (
    <div>
      <h1>Create Appointment</h1>
      <form onSubmit={handleSubmitCreateAppt}>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={newAppointment.description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={format(newAppointment.date, "yyyy-MM-dd")} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" value={newAppointment.time} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="patientId">Select Patient:</label>
          <select id="patientId" name="patientId" value={newAppointment.patientId} onChange={handleInputChange}>
            <option value="">Select Patient</option>
            {roles.patient.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="doctorId">Select Doctor:</label>
          <select id="doctorId" name="doctorId" value={newAppointment.doctorId} onChange={handleInputChange}>
            <option value="">Select Doctor</option>
            {roles.doctor.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentsPage;
