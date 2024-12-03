import React, { useEffect, useState, useCallback } from "react";
import apiServices from "../../../../services/apiServices";
import "./AddPatientPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PatientCardComp from "../../../components/PatientCardComp/PatientCardComp";

const AddPatientPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roles, setRoles] = useState({ professional: [], patient: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsersByRoles = async (rolesArray) => {
    const rolesData = {};
    for (const role of rolesArray) {
      try {
        const users = await apiServices.getApiUserByRole(role, "createdAt", "DESC", 4);
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

  // if (loading) {
  //   return <div className="loading">Loading patients...</div>;
  // }

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  const pageTitle =
    location.pathname === "/add-professionals"
      ? "Add Professional" //
      : location.pathname === "/patient"
      ? "Add Patients"
      : "Add User";

  const [formData, setFormData] = useState({
    firstName: "Paciente 123",
    lastName: "Prueba",
    email: "patient31@gmail.com",
    whatsapp: "+5491123456497",
    nDni: "28675430",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validaciones básicas antes de enviar
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiServices.registerUser(formData);
      console.log("response", response);
      setMessage("Profesional añadido exitosamente.");
      loadUsers();
    } catch (error) {
      // Identificar si el error tiene una respuesta del backend
      if (error.response && error.response.data) {
        const { message, statusCode } = error.response.data;

        // Manejar errores según su mensaje o código
        if (statusCode === 401) {
          setMessage(`Error: ${message}`);
        } else if (statusCode === 400) {
          setMessage("Solicitud inválida. Verifica los datos ingresados.");
        } else {
          setMessage(`Error inesperado: ${message || "Intenta de nuevo más tarde."}`);
        }
      } else if (error.request) {
        // Cuando no se recibe respuesta del servidor
        setMessage("No se pudo contactar al servidor. Verifica tu conexión.");
      } else {
        // Error genérico
        setMessage("Ocurrió un error inesperado. Intenta de nuevo.");
      }
      console.error("Error al registrar al profesional:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior en el historial
  };

  return (
    <div className="AddPatientPageContainer">
      <aside className="AddPatientPageForm">
        <button className="back-button" onClick={handleBack}>
          Volver
        </button>

        <h2>{pageTitle}</h2>
        <form onSubmit={handleRegisterSubmit}>
          <aside>
            <input type="text" name="firstName" placeholder="Nombre *" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} />
            <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
            <input type="text" name="nDni" placeholder="DNI" value={formData.nDni} onChange={handleChange} />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Añadiendo..." : "Añadir"}
            </button>
            {message && <p>{message}</p>}
          </aside>
        </form>
      </aside>
      <div className="PatiensPage">
        <section>
          <aside className="title_container">
            <h2 className="title">Creados recientemente</h2>
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
    </div>
  );
};

export default AddPatientPage;
