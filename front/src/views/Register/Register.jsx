import React, { useEffect, useState } from "react";
import "./Register.css";
import { validateForm, isButtonDisabled } from "../../helpers/validateForm";
import apiServices from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Pepe",
    lastName: "Perez",
    email: "pepe@gmail.com",
    username: "pepe_perez",
    password: "P4ssWord@123",
    confirmPassword: "P4ssWord@123",
    birthdate: "2000-01-01",
    nDni: "12345678",
  });

  const [validateFormErrors, setValidateFormErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [blur, setBlur] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
    birthdate: false,
    nDni: false,
  });

  useEffect(() => {
    const errors = validateForm(formData);
    setValidateFormErrors(errors);
    // setIsButtonDisabled(isButtonDisabled(formData));
  }, [formData]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleBlur = (event) => {
    const { id, value } = event.target;
    setBlur((prevData) => ({
      ...prevData,
      [id]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidateFormErrors(errors);
      return;
    }

    apiServices
      .registerUser(formData)
      .then((response) => {
        setSubmitMessage("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        setSubmitMessage("There was an error registering: " + error.message);
      });
  };

  return (
    <div className="main">
      <h1>Registro de Paciente</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" id="firstName" defaultValue={formData.firstName} onBlur={handleBlur} onChange={handleChange} required />
          {blur.firstName && validateFormErrors.firstName && <p>{validateFormErrors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" id="lastName" defaultValue={formData.lastName} onBlur={handleBlur} onChange={handleChange} required />
          {blur.lastName && validateFormErrors.lastName && <p>{validateFormErrors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" defaultValue={formData.email} onBlur={handleBlur} onChange={handleChange} required />
          {blur.email && validateFormErrors.email && <p>{validateFormErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" defaultValue={formData.username} onBlur={handleBlur} onChange={handleChange} required />
          {blur.username && validateFormErrors.username && <p>{validateFormErrors.username}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" defaultValue={formData.password} onBlur={handleBlur} onChange={handleChange} required />
          {blur.password && validateFormErrors.password && <p>{validateFormErrors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" name="confirmPassword" id="confirmPassword" defaultValue={formData.confirmPassword} onBlur={handleBlur} onChange={handleChange} required />
          {blur.confirmPassword && validateFormErrors.confirmPassword && <p>{validateFormErrors.confirmPassword}</p>}
        </div>

        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input type="date" name="birthdate" id="birthdate" defaultValue={formData.birthdate} onBlur={handleBlur} onChange={handleChange} required />
          {blur.birthdate && validateFormErrors.birthdate && <p>{validateFormErrors.birthdate}</p>}
        </div>

        <div>
          <label htmlFor="nDni">DNI:</label>
          <input type="text" name="nDni" id="nDni" defaultValue={formData.nDni} onBlur={handleBlur} onChange={handleChange} required />
          {blur.nDni && validateFormErrors.nDni && <p>{validateFormErrors.nDni}</p>}
        </div>

        <button type="submit" disabled={isButtonDisabled(formData)}>
          Register
        </button>

        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
