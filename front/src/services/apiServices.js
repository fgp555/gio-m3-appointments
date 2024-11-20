// front\src\services\apiServices.js

import axios from "axios";

const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api" : "https://crefi.giomr.site/api";

const apiServices = {
  login: async (logindata) => {
    const response = await axios.post(`${API_URL}/users/login`, logindata);
    return response;
  },

  getAppointments: async (userId) => {
    if (!userId) {
      console.error("Error: userId is undefined");
      return [];
    }
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data.appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  },

  createAppointments: async (appointmentData) => {
    const response = await axios.post(`${API_URL}/appointments/schedule`, appointmentData);
    return response.data;
  },

  cleanAppointments: async (appointmentId) => {
    const response = await axios.put(`${API_URL}/appointments/cancel/${appointmentId}`);
    return response;
  },

  registerUser: async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response;
  },
};

export default apiServices;
