import React, { useState, useEffect } from "react";
import apiServices from "../../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../redux/userSlice";
import "./AdminLoginPages.css";

const AdminLoginPages = () => {
  const [formData, setFormData] = useState({ email: "jane.goodall@cliniccare.com", password: "SecurePass@2023" });
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Nuevo estado para dark mode

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    return formData.email && formData.password;
  };

  useEffect(() => {
    setIsButtonDisabled(!validateForm());
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await apiServices.login(formData);
      navigate("/dashboard");
      dispatch(fetchUser(response));
      setMessage("Login exitoso.");
    } catch (error) {
      console.error("Error en login:", error);
      if (error.response) {
        setMessage(`Error en el login: ${error.response.data.message || "Por favor, intente nuevamente."}`);
      } else if (error.request) {
        setMessage("Error de red. Por favor, verifique su conexión e intente nuevamente.");
      } else {
        setMessage("Ocurrió un error inesperado. Intente más tarde.");
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`AdminLoginPages`}>
      <section className={`form_container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <h1>Iniciar Sesión</h1>
        {/* <button onClick={toggleDarkMode}>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</button> */}
        <form onSubmit={handleSubmit}>
          <aside>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </aside>
          <aside>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </aside>
          <button type="submit" disabled={isButtonDisabled}>
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </section>
    </div>
  );
};

export default AdminLoginPages;
