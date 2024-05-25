import "./Register.css";
import axios from 'axios';
import { useState } from 'react';
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
        nDni: ''
    });

    const [validateFormErrors, setValidateFormErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');
    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.username) errors.username = 'Username is required';
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.birthdate) errors.birthdate = 'Birthdate is required';
        if (!formData.nDni) errors.nDni = 'DNI is required';
        return errors;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidateFormErrors(errors);
        } else {
            setValidateFormErrors({});
            axios.post("http://localhost:3000/users/register", formData)
                .then((response) => {
                    setSubmitMessage('Registration successful');
                })
                .catch((error) => {
                    setSubmitMessage('There was an error registering: ' + error.message);
                })
        }
    }

    return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" >First Name:</label>
                        <input type="text" name="firstName" id="firstName" defaultValue={"John"}  onChange={handleChange} required />
                        {validateFormErrors.firstName && <p>{validateFormErrors.firstName}</p>}
                    </div>

                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" defaultValue={"Doe"}  onChange={handleChange} required />
                        {validateFormErrors.lastName && <p>{validateFormErrors.lastName}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" defaultValue={"johndoe@example.com"} onChange={handleChange}  required />
                        {validateFormErrors.email && <p>{validateFormErrors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" defaultValue={"johndoe"}  onChange={handleChange}  required />
                        {validateFormErrors.username && <p>{validateFormErrors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" defaultValue={"123456"}  onChange={handleChange} required />
                        {validateFormErrors.password && <p>{validateFormErrors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" defaultValue={"123456"} onChange={handleChange}  required />
                        {validateFormErrors.confirmPassword && <p>{validateFormErrors.confirmPassword}</p>}
                    </div>
                    <div>
                        <label htmlFor="birthdate">Birthdate:</label>
                        <input type="date" id="birthdate" defaultValue={"1990-01-01"} onChange={handleChange}  required />
                        {validateFormErrors.birthdate && <p>{validateFormErrors.birthdate}</p>}
                    </div>
                    <div>
                        <label htmlFor="nDni">DNI:</label>
                        <input type="text" id="nDni" defaultValue={"12345678"} onChange={handleChange}  required />
                        {validateFormErrors.nDni && <p>{validateFormErrors.nDni}</p>}
                    </div>
                    <button type="submit">Register</button>
                    {submitMessage && <p>{submitMessage}</p>}
                </form>
            </div>
        )
    }

    export default Register;