import { Request, Response } from 'express';
import { getAppointmentsService,getAppointmentByIdService,createAppointmentService,cancelAppointmentService } from '../services/appointmentsService';

// Obtener el listado de todos los turnos de todos los usuarios
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAppointmentsService();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};
  // res.send('Obtener el listado de todos los turnos de todos los usuarios');


// // Obtener el detalle de un turno específico
// export const getAppointment = (req: Request, res: Response) => {
//   res.send('Obtener el detalle de un turno específico');
// };
export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointmentId = parseInt(req.params.id);
    const appointment = await getAppointmentByIdService(appointmentId);
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(404).send('turno no fue encontrado');
  }
};
// Agendar un nuevo turno
export const scheduleAppointment = async (req: Request, res: Response) => {
  try {
    const { userId, date, time, description } = req.body;
    await createAppointmentService(userId, date, time,description );
    res.status(201).send('Turno creado correctamente');
  } catch (error) {
    console.error(error);
    res.status(400).send('los datos son incorrectos');
  }
};


// Cambiar el estatus de un turno a “cancelled”
export const cancelAppointment = async(req: Request, res: Response) => {
  try {
    const appointmentId = parseInt(req.params.id);
    await cancelAppointmentService(appointmentId);
    res.status(200).send('Turno cancelado correctamente');
  } catch (error) {
    console.error(error);
    res.status(404).send(' el turno no fue encontrado');
  }
};
 