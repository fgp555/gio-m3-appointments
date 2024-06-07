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
import nodemailer from "nodemailer";
import { PASSAPP, USER } from "../config/envs";

export const createAppointmentService = async (userId: number, date: Date, time: string, description: string): Promise<AppointmentEntity> => {
    const foundUserId = await UserModel.findOneBy({id :userId});
    if (!foundUserId) {
        throw new Error('El usuario no existe');
    }
  

const userGmail = USER;
const passAppGmail = PASSAPP;


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});


const mailOptions = {
  from: userGmail,
  to: foundUserId.email ,
  subject: "Gracias por agendar tu turno",
  text: `tienes reservado un turno `,
 
};
console.log(foundUserId.appointments)

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});
    
    const newObject = {date, time, status:"active", userId: foundUserId, description}
   const appointmentSave =  await AppointmentModel.save(newObject);
    return appointmentSave;
};



export const cancelAppointmentService = async (id: number): Promise<void> => {
    const appointment = await AppointmentModel.findOneBy({id});
    if (!appointment) {
        throw new Error('El turno no existe');
    }

    appointment.status = 'cancelled';
    await AppointmentModel.save(appointment);
};