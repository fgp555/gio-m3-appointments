import { Appointment } from 'src/module/appointment/entities/appointment.entity';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    username: string;
    password: string;
    birthdate: string;
    nDni: string;
    image: string;
    role: 'patient' | 'doctor' | 'admin';
    appointmentsAsPatient: Appointment[];
    appointmentsAsDoctor: Appointment[];
    createdAt: Date;
}
