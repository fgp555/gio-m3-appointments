import React, { useEffect, useState, useCallback } from "react";
import apiServices from "../../../services/apiServices";
import "./AddProfessionalPage.css";
import { useLocation, useNavigate } from "react-router-dom";

const AddProfessionalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle =
    location.pathname === "/add-professionals"
      ? "Añadir Profesional" //
      : location.pathname === "/patient"
      ? "Añadir Pacientes"
      : "Añadir Usuario";

  const [formData, setFormData] = useState({
    title: "Licenciada",
    firstName: "Natali",
    lastName: "M Russo",
    email: "nmrusso@crefi.com",
    whatsapp: "+5491123456797",
    username: "doctor_giovanna",
    password: "SecurePass@2023",
    confirmPassword: "SecurePass@2023",
    birthdate: "1985-08-30",
    nDni: "28675431",
    role: "professional",
    image: "https://i.postimg.cc/HW2KSY5d/02.jpg",
    specialization: "RPG, Drenaje Linfático y Pilates",
    bio: "Licenciada Martínez Russo Giovanna cuenta con experiencia en Reeducación Postural Global (RPG), drenaje linfático y Pilates. Su dedicación y conocimientos avanzados en estas áreas son fundamentales para nuestro equipo.",
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
  const handleSubmit = async (event) => {
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

  const autoResize = (textarea) => {
    textarea.style.height = "auto"; // Resetea la altura primero
    textarea.style.height = textarea.scrollHeight + "px"; // Ajusta la altura según el contenido
  };

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior en el historial
  };

  return (
    <div className="AddProfessionalPage">
      <button className="back-button" onClick={handleBack}>
        Regresar
      </button>
      <h2>{pageTitle}</h2>
      <form onSubmit={handleSubmit}>
        <aside>
          <input type="text" name="title" placeholder="Titulo (ej. Licenciado)" value={formData.title} onChange={handleChange} required />
          <input type="text" name="firstName" placeholder="Nombre *" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} required />
          <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
          <input type="text" name="username" placeholder="Nombre de Usuario" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} required />
        </aside>
        <aside>
          <input type="date" name="birthdate" placeholder="Fecha de Nacimiento" value={formData.birthdate} onChange={handleChange} />
          <input type="text" name="nDni" placeholder="DNI" value={formData.nDni} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="patient">Paciente</option>
            <option value="professional">Profesional</option>
            <option value="admin">Administrador</option>
          </select>
          <input type="text" name="image" placeholder="URL de Imagen" value={formData.image} onChange={handleChange} />
          <input type="text" name="specialization" placeholder="Especialización" value={formData.specialization} onChange={handleChange} />
          <textarea onInput={(e) => autoResize(e.target)} name="bio" placeholder="Biografía" value={formData.bio} onChange={handleChange}></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Añadiendo..." : "Añadir Profesional"}
          </button>
          {message && <p>{message}</p>}
        </aside>
      </form>
    </div>
  );
};

export default AddProfessionalPage;
