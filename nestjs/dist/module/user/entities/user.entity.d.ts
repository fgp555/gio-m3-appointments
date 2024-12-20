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
    role: 'patient' | 'professional' | 'admin';
    title: string;
    specialization: string;
    bio: string;
    appointmentsAsPatient: Appointment[];
    appointmentsAsProfessional: Appointment[];
    gender?: 'woman' | 'man';
    createdAt: Date;
}
