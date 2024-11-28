import React, { useEffect, useState } from "react";
import ProfCardComp from "../../components/ProfCardComp/ProfCardComp";
import apiServices from "../../../services/apiServices";
import "./ProfessionalsPage.css";
import { Link } from "react-router-dom";

const ProfessionalsPage = () => {
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
    return <div className="loading">Loading professionals...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="ProfessionalsPage">
      <section>
        <aside className="title_container">
          <h2 className="title">Professionals</h2>
          <Link to="/add-professionals">
            <button>Add Professional</button>
          </Link>
        </aside>
        <ul className="cards_container">
          {roles.professional.map((professional) => (
            <ProfCardComp
              key={professional.id}
              professional={professional}
              refreshUsers={loadUsers} // Pasar función al hijo
            />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProfessionalsPage;
