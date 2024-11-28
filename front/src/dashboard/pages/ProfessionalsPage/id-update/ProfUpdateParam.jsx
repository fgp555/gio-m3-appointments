import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProfUpdateParam.css";
import apiServices from "../../../../services/apiServices";

const ProfUpdateParam = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userById, setUserById] = useState(null);
  const [formData, setFormData] = useState({
    // title: "Licenciada",
    // firstName: "Natali",
    // lastName: "M Russo",
    // email: "nmrusso@crefi.com",
    // whatsapp: "+5491123456797",
    // username: "doctor_giovanna",
    // password: "SecurePass@2023",
    // confirmPassword: "SecurePass@2023",
    // birthdate: "1985-08-30",
    // nDni: "28675431",
    // role: "professional",
    // image: "https://i.postimg.cc/HW2KSY5d/02.jpg",
    // specialization: "RPG, Drenaje Linfático y Pilates",
    // bio: "Licenciada Martínez Russo Giovanna cuenta con experiencia en Reeducación Postural Global (RPG), drenaje linfático y Pilates. Su dedicación y conocimientos avanzados en estas áreas son fundamentales para nuestro equipo.",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getUserById = async (id) => {
    try {
      const res = await apiServices.apiGetUserById(id);
      setUserById(res);
      setFormData(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = apiServices.apiUpdateUser(formData, id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    // Lógica para enviar el formulario
  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto"; // Resetea la altura primero
    textarea.style.height = textarea.scrollHeight + "px"; // Ajusta la altura según el contenido
  };

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior en el historial
  };
  return (
    <div className="ProfUpdateParam">
      {/* <pre>{JSON.stringify(userById, null, 2)}</pre> */}
      <button className="back-button" onClick={handleBack}>
        Regresar
      </button>
      <h2>{id}</h2>
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

export default ProfUpdateParam;
