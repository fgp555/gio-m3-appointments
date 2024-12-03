import React, { useState, useEffect } from "react";
import apiServices from "../../../services/apiServices";
import "./SelectComponent.css";

const SelectComponent = ({ onSelectRolesChange, defaultRoles }) => {
  const [roles, setRoles] = useState({
    professional: [],
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
      for (const role of ["professional", "patient"]) {
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
        <label htmlFor="patientId">Paciente: </label>
        <select id="patientId" name="patientId" value={selectRoles.patientId} onChange={handleInputChange} required onInvalid={handleInvalid}>
          <option value="">Seleccionar Paciente</option>
          {roles.patient.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </select>
      </section>
      <section className="SelectComponent professional_container">
        <label htmlFor="professionalId">Profesional: </label>
        <select id="professionalId" name="professionalId" value={selectRoles.professionalId} onChange={handleInputChange} required onInvalid={handleInvalid}>
          <option value="">Seleccionar Profesional</option>
          {roles.professional.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.firstName} {professional.lastName}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default SelectComponent;
