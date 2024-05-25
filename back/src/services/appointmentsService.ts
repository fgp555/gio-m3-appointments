import {getUserByIdService,getUsersService,createUserService }from "./userService";
import { getUserById,getUsers,createUser } from "../controllers/usersControllers";
import { AppointmentModel, UserModel } from "../config/AppDataSource ";
import { AppointmentEntity } from "../entities/appointmentsEntity";


export const getAppointmentsService = async (): Promise<AppointmentEntity[]> => {
    const appointments= await AppointmentModel.find({
        relations:{
            userId: true
        }
    });
    return appointments;
};

export const getAppointmentByIdService = async (id: number): Promise<AppointmentEntity | null> => {
    const appointment = await AppointmentModel.findOneBy({
        id 
    });
    if (!appointment) {
        throw new Error('El turno no existe');
    }
    return appointment 
};

export const createAppointmentService = async (userId: number, date: Date, time: string, description: string): Promise<AppointmentEntity> => {
    const foundUserId = await UserModel.findOneBy({id :userId});
    if (!foundUserId) {
        throw new Error('El usuario no existe');
    }
    // const newAppointment = new Appointment({ user: foundUserId, date, time, status: 'active' });
    const newObject = {date, time, status:"active", userId: foundUserId, description}
   const appointmentSave =  await AppointmentModel.save(newObject);
    return appointmentSave;
};

// export const createAppointmentService = async (userId: number, date: Date, time: string): Promise<Appointment> => {
//     const newAppointment = await AppointmentModel.create(newAppointment)
//     const result = await AppointmentModel.save(newAppointment);
     
//     const user = await UserModel.findOneBy({
//         id: newAppointment.userId 
//     })
//  if (user) {
//      newAppointment.user = user;
//      AppointmentModel.save(newAppointment)
//         }
//       return newAppointment;
// };


export const cancelAppointmentService = async (id: number): Promise<void> => {
    const appointment = await AppointmentModel.findOneBy({id});
    if (!appointment) {
        throw new Error('El turno no existe');
    }

    appointment.status = 'cancelled';
    await AppointmentModel.save(appointment);
};