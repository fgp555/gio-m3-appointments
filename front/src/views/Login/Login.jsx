import React, { useState, useEffect } from "react";
import apiServices from "../../services/apiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ username: "pepe_perez", password: "P4ssWord@123" });
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
    return formData.username && formData.password;
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
      navigate("/mis-turnos");
      console.log("response.data", response.data);
      dispatch(fetchUser(response.data));
      setMessage("Login exitoso.");
    } catch (error) {
      setMessage("Error en el login. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="main">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
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
