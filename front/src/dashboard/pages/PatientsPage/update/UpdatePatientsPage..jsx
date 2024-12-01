import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePatientsPage.css";
import apiServices from "../../../../services/apiServices";
import { useSelector } from "react-redux";

const UpdatePatientsPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userById, setUserById] = useState(null);
  const userStore = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    nDni: "",
    role: "",
    image: "",
    specialization: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiServices.apiGetUserById(id);
        setFormData((prevData) => ({
          ...prevData,
          ...res, // Solo reemplaza las propiedades existentes en `res`
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setMessage(null);

    // Validaciones básicas antes de enviar
    if (formData.password !== formData.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await apiServices.apiUpdateUser(id, formData);
      console.log(res);
      setMessage("Profesional actualizado exitosamente.");
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
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior en el historial
  };

  return (
    <div className="UpdatePatientsPage">
      {/* <pre>{JSON.stringify(userStore, null, 2)}</pre> */}
      <button className="back-button" onClick={handleBack}>
        Go back
      </button>
      <h2> Update Patient with ID:{id}</h2>
      <form onSubmit={handleSubmit}>
        <aside>
          <input type="text" name="firstName" placeholder="Name *" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
          <input type="text" name="nDni" placeholder="DNI" value={formData.nDni} onChange={handleChange} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Update"}
          </button>
          {message && <p>{message}</p>}{" "}
        </aside>
        <aside></aside>
      </form>
    </div>
  );
};

export default UpdatePatientsPage;
