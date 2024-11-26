import React, { useState, useEffect } from "react";
import apiServices from "../../../services/apiServices";
import "./SelectComponent.css";

const SelectComponent = ({ onSelectRolesChange, defaultRoles }) => {
  const [roles, setRoles] = useState({
    doctor: [],
    patient: [],
  });

  const [selectRoles, setSelectRoles] = useState(defaultRoles);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedSelectRoles = {
      ...selectRoles,
      [name]: value,
    };
    setSelectRoles(updatedSelectRoles);

    // Notifica al componente padre
    if (onSelectRolesChange) {
      onSelectRolesChange(updatedSelectRoles);
    }
  };

  const handleInvalid = (e) => {
    // Se ejecuta cuando un campo no cumple con los requisitos
    if (!e.target.value) {
      // Cambia el mensaje de error si no se selecciona un valor
      e.target.setCustomValidity("Please select a valid option123.");
    } else {
      e.target.setCustomValidity("");
    }
  };

  return (
    <div className="SelectComponent">
      <section className="SelectComponent patient_container">
        <label htmlFor="patientId">Patient: </label>
        <select
          //
          id="patientId"
          name="patientId"
          value={selectRoles.patientId}
          onChange={handleInputChange}
          required
          onInvalid={handleInvalid}
        >
          <option value="">Select Patient</option>
          {roles.patient.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </select>
      </section>
      <section className="SelectComponent doctor_container">
        <label htmlFor="doctorId">Doctor: </label>
        <select
          //
          id="doctorId"
          name="doctorId"
          value={selectRoles.doctorId}
          onChange={handleInputChange}
          required
          onInvalid={handleInvalid}
        >
          <option value="">Select Doctor</option>
          {roles.doctor.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default SelectComponent;
