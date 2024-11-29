// front\src\services\apiServices.js

import axios from "axios";

const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api" : "https://crefi.giomr.site/api";
// const API_URL = window.location.hostname === "localhost" ? "http://localhost:3000/api" : "https://back.fgp.one/api";

const apiServices = {
  registerUser: async (userData) => {
    try {
      console.log("userData", userData);
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
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

  apiDeleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);
      if (response.status !== 200) {
        throw new Error(response.data?.message || "Error al eliminar usuario.");
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error inesperado al eliminar el usuario.";
      console.error("Error en apiDeleteUser:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  apiUpdateUser: async (userId, userData) => {
    delete userData.appointmentsAsProfessional;
    delete userData.appointmentsAsPatient;

    try {
      const response = await axios.patch(`${API_URL}/auth/update/${userId}`, userData);
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

  apiGetUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Full error object:", error); // Log the full error object
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
      const response = await axios.get(`${API_URL}/appointments`);
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

  fetchAppointmentsLastCount: async (count) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/last/${count}`);
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
      const response = await axios.post(`${API_URL}/appointments`, appointmentData);
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

  cleanAppointments: async (appointmentId) => {
    console.log("Cleaning appointments...");
  },

  cancelAppointment: async (appointmentId) => {
    try {
      const response = await axios.patch(`${API_URL}/appointments/cancel/${appointmentId}`);
      return response.data; // Return the updated appointment data
    } catch (error) {
      console.error(`Failed to cancel appointment with ID ${appointmentId}:`, error);

      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || "Error canceling appointment");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Unknown error");
      }
    }
  },

  deleteAppointment: async (appointmentId) => {
    try {
      const response = await axios.delete(`${API_URL}/appointments/${appointmentId}`);
      return response.data; // Return the result of the deletion
    } catch (error) {
      console.error(`Failed to delete appointment with ID ${appointmentId}:`, error);

      if (error.response) {
        console.error("Error response:", error.response.data);
        throw new Error(error.response.data.message || "Error deleting appointment");
      } else if (error.request) {
        console.error("No response received:", error.request);
        throw new Error("No response from server");
      } else {
        throw new Error(error.message || "Unknown error");
      }
    }
  },
};

export default apiServices;
