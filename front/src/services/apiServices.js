import axios from "axios";

const API_URL = "http://localhost:3000";

const apiServices = {
  login: async (logindata) => {
    const response = await axios.post(`http://localhost:3000/users/login`, logindata);
    return response;
  },
  // getAppointments: async (userId)=>{
  //     const response= await axios.get(`http://localhost:3000/users/${(userId)}`)
  //     return response.data.appointments
  // },
  getAppointments: async (userId) => {
    if (!userId) {
      console.error("Error: userId is undefined");
      return [];
    }
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      return response.data.appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
  },
  createAppointments: async (appointmentData) => {
    const response = await axios.post(`http://localhost:3000/appointments/schedule`, appointmentData);
    return response.data;
  },

  cleanAppointments: async (appointmentId) => {
    const response = await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`);
    return response;
  },

  registerUser: async (userData) => {
    const response = await axios.post(`http://localhost:3000/users/register`, userData);
    return response;
  },
};

export default apiServices;
