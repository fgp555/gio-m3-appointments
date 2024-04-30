import { Request, Response } from 'express';

// Obtener el listado de todos los turnos de todos los usuarios
export const getAppointments = (req: Request, res: Response) => {
  res.send('Obtener el listado de todos los turnos de todos los usuarios');
};

// Obtener el detalle de un turno específico
export const getAppointment = (req: Request, res: Response) => {
  res.send('Obtener el detalle de un turno específico');
};

// Agendar un nuevo turno
export const scheduleAppointment = (req: Request, res: Response) => {
  res.send('Agendar un nuevo turno');
};

// Cambiar el estatus de un turno a “cancelled”
export const cancelAppointment = (req: Request, res: Response) => {
  res.send('Cambiar el estatus de un turno a "cancelled"');
};
