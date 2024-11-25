import React, { useState, useEffect } from "react";
import apiServices from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "pepe@gmail.com", password: "P4ssWord@123" });
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
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

    // Validación del formulario
    if (!validateForm()) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Intentamos hacer login
      const response = await apiServices.login(formData);
      navigate("/mis-turnos"); // Navegar a la página de "mis-turnos"
      // Disparar la acción para almacenar los datos del usuario
      dispatch(fetchUser(response));
      console.log("response", response);
      // Mostrar mensaje de éxito
      setMessage("Login exitoso.");
    } catch (error) {
      // Si ocurre un error en la API, manejamos el error específico
      console.error("Error en login:", error);
      if (error.response) {
        // Si el error tiene una respuesta del servidor, mostramos el mensaje del servidor
        setMessage(`Error en el login: ${error.response.data.message || "Por favor, intente nuevamente."}`);
      } else if (error.request) {
        // Si no hay respuesta del servidor, podría ser un problema de red
        setMessage("Error de red. Por favor, verifique su conexión e intente nuevamente.");
      } else {
        // Si el error es de otro tipo
        setMessage("Ocurrió un error inesperado. Intente más tarde.");
      }
    }
  };

  return (
    <div className="main">
      {/* <pre>{JSON.parse(localStorage.getItem("user"))}</pre> */}
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
