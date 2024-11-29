import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfUpdateParam.css";
import apiServices from "../../../../services/apiServices";
import { useSelector } from "react-redux";

const ProfUpdateParam = () => {
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
    <div className="ProfUpdateParam">
      {/* <pre>{JSON.stringify(userStore, null, 2)}</pre> */}
      <button className="back-button" onClick={handleBack}>
        Regresar
      </button>
      <h2> Actualizar Profesional con ID:{id}</h2>
      <form onSubmit={handleSubmit}>
        <aside>
          <input type="text" name="title" placeholder="Titulo (ej. Licenciado)" value={formData.title} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="Nombre *" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} />
          <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
          <input type="text" name="username" placeholder="Nombre de Usuario" value={formData.username} onChange={handleChange} />
          <input type="password" name="password" placeholder="Contraseña (opcional)" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña (opcional)" value={formData.confirmPassword} onChange={handleChange} />
        </aside>
        <aside>
          <input type="date" name="birthdate" placeholder="Fecha de Nacimiento" value={formData.birthdate} onChange={handleChange} />
          <input type="text" name="nDni" placeholder="DNI" value={formData.nDni} onChange={handleChange} />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="patient">Paciente</option>
            <option value="professional">Profesional</option>
            <option value="admin">Administrador</option>
          </select>
          <input type="text" name="image" placeholder="URL de Imagen" value={formData.image} onChange={handleChange} />
          <input type="text" name="specialization" placeholder="Especialización" value={formData.specialization} onChange={handleChange} />
          <textarea onInput={(e) => autoResize(e.target)} name="bio" placeholder="Biografía" value={formData.bio} onChange={handleChange}></textarea>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Añadiendo..." : "Actualizar"}
          </button>
          {message && <p>{message}</p>}
        </aside>
      </form>
    </div>
  );
};

export default ProfUpdateParam;
