// http://localhost:3000/users/1

// http://localhost:3000/users/register

// http://localhost:3000/users/login

// http://localhost:3000/appointments/schedule

// http://localhost:3000/appointments/cancel/1
import axios from "axios"
import { cleanAppointments } from "../redux/userAppointmentsSlice"

const API_URL = "http://localhost:3000"

const apiServices = {
    login: async (logindata) => {
        const response = await axios.post(`http://localhost:3000/users/login`, logindata)
        return response
    },
    getAppointments: async (userId)=>{
        const response= await axios.get(`http://localhost:3000/users/${Number(userId)}`)
        return response.data.appointments
    },

    createAppointments: async(appointmentData)=>{
        const response = await axios.post(`http://localhost:3000/appointments/schedule`, appointmentData)
        return response.data
    },

    cleanAppointments:  async (appointmentId)=>{
    const response = await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`)
    return response
    },

    registerUser: async (userData) =>{
        const response= await axios.post(`http://localhost:3000/users/register`, userData)
        return response
    }
}

export default apiServices