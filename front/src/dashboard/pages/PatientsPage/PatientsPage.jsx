import React, { useEffect, useState } from "react";
import apiServices from "../../../services/apiServices";
import { Link } from "react-router-dom";
import "./PatientsPage.css";
import PatientCardComp from "../../components/PatientCardComp/PatientCardComp";

const PatientsPage = () => {
  const [roles, setRoles] = useState({ professional: [], patient: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersByRoles = async (rolesArray) => {
    const rolesData = {};
    for (const role of rolesArray) {
      try {
        const users = await apiServices.getApiUserByRole(role);
        rolesData[role] = users || [];
      } catch (error) {
        console.error(`Error fetching users with role ${role}:`, error);
        rolesData[role] = [];
      }
    }
    return rolesData;
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const rolesData = await fetchUsersByRoles(["professional", "patient"]);
      setRoles(rolesData);
    } catch (err) {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="PatiensPage">
      <section>
        <aside className="title_container">
          <h2 className="title">Pacientes</h2>
          <Link className="add_button" to="/create-patient">
            <button className="add_button">Agregar Paciente</button>
          </Link>
        </aside>

        <ul className="cards_container">
          {roles.patient.map((item) => (
            <PatientCardComp
              key={item.id}
              patient={item}
              refreshUsers={loadUsers} // Pasar función al hijo
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PatientsPage;
