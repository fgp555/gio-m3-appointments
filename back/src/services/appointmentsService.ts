import Appointment from "../interfaces/IAppointments";
import {getUserByIdService,getUsersService,createUserService }from "./userService";
import { getUserById,getUsers,createUser } from "../controllers/usersControllers";

const appointments: Appointment[] = []; // Arreglo para almacenar los datos de los turnos

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    return appointments;
};

export const getAppointmentByIdService = async (appointmentId: number): Promise<Appointment | null> => {
    const appointment = appointments.find(appointment => appointment.id === appointmentId);
    return appointment ? appointment : null;
};

export const createAppointmentService = async (userId: number, date: Date, time: string): Promise<void> => {
    const user = await getUserByIdService(userId)
    if (!user) {
        throw new Error('El usuario no existe');
    }
    // Crear un nuevo turno con los datos proporcionados y el ID del usuario
    const newAppointment: Appointment = {
        id: appointments.length + 1,
        userId,
        date,
        time,
        status: 'active'
    };
    appointments.push(newAppointment); // Agregar el nuevo turno al arreglo
};

export const cancelAppointmentService = async (appointmentId: number): Promise<void> => {
    const index = appointments.findIndex(appointment => appointment.id === appointmentId);
    if (index !== -1) {
        appointments[index].status = 'cancelled'; // Cambiar el estado del turno a "cancelled"
    }
};
