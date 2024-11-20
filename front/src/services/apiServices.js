// front\src\services\apiServices.js

import axios from "axios";

const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api" : "https://crefi.giomr.site/api";

const apiServices = {
  login: async (logindata) => {
    const response = await axios.post(`${API_URL}/users/login`, logindata);
    return response;
  },

  fetchUserAppointments: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          token: "autenticado",
        },
      });
      return response.data.appointments;
    } catch (error) {
      console.error("Error fetching appointments", error);
      throw error;
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${API_URL}/appointments/schedule`, appointmentData, {
        headers: {
          "Content-Type": "application/json",
          token: "autenticado",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating appointment", error);
      throw error;
    }
  },

  cleanAppointments: async (appointmentId) => {
    const response = await axios.put(`${API_URL}/appointments/cancel/${appointmentId}`);
    return response;
  },

  registerUser: async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response;
  },

  cancelAppointment: async (appointmentId) => {
    try {
      const response = await axios.post(`${API_URL}/appointments/${appointmentId}`, {
        headers: {
          "Content-Type": "application/json",
          token: "autenticado",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error canceling appointment", error);
      throw error;
    }
  },
};

export default apiServices;
