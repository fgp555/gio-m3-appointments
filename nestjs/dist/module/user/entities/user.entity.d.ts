import { Appointment } from 'src/module/appointment/entities/appointment.entity';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    birthdate: string;
    nDni: string;
    image: string;
    isAdmin: boolean;
    appointments: Appointment[];
    createdAt: Date;
}
