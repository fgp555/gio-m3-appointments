// front\src\services\apiServices.js

import axios from "axios";

const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api" : "https://crefi.giomr.site/api";

const apiServices = {
  registerUser: async (userData) => {
    try {
      console.log("userData", userData);
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      console.log("response", response);
      return response;
    } catch (error) {
      console.error("Full error object:", error); // Log the full error object

      if (error.response) {
        // Request was made and the server responded with an error
        console.error("Error response:", error.response);
        // Log the structure of the response to inspect its contents
        console.log("Response data structure:", error.response.data);
        const { message, statusCode } = error.response.data; // Assuming the structure is { message, statusCode }
        console.log(`Error message: ${message}, Status code: ${statusCode}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else went wrong
        console.error("Error message:", error.message);
      }

      throw error; // Re-throw the error for further handling
    }
  },

  login: async (logindata) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, logindata);
      return response.data;
    } catch (error) {
      // Aquí podemos manejar errores específicos antes de pasarlos al handleSubmit
      console.error("Error en login API:", error);
      throw error; // Re-lanzamos el error para que lo maneje handleSubmit
    }
  },

  fetchAppointments: async () => {
    try {
      console.log("Fetching appointments...");
      const response = await axios.get(`${API_URL}/appointments`);
      console.log("Appointments fetched successfully:", response.data);
      return response.data; // Return the appointments data
    } catch (error) {
      console.error("Error occurred while fetching appointments:", error);

      if (error.response) {
        // Server responded with a status outside the 2xx range
        console.error("Error response:", error.response);
        console.log("Response data structure:", error.response.data);
        const { message, statusCode } = error.response.data;
        console.log(`Error message: ${message}, Status code: ${statusCode}`);
      } else if (error.request) {
        // No response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error message:", error.message);
      }

      throw error; // Re-throw for further handling
    }
  },

  createAppointment: async (appointmentData) => {
    try {
      console.log("appointmentData", appointmentData);
      const response = await axios.post(`${API_URL}/appointments`, appointmentData);
      console.log("Appointment created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create appointment:", error);

      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || "Error creating appointment");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Unknown error");
      }
    }
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

  getApiUserByRole: async (role) => {
    try {
      const response = await axios.get(`${API_URL}/users/role/${role}`, {
        headers: {
          "Content-Type": "application/json",
          token: "autenticado",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching role", error);
      throw error;
    }
  },

  cleanAppointments: async (appointmentId) => {
    const response = await axios.put(`${API_URL}/appointments/cancel/${appointmentId}`);
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
