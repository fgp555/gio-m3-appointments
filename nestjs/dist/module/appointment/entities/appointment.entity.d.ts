import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class Appointment {
    id: number;
    date: string;
    description: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'RESCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'NO_SHOW';
    patient: UserEntity;
    professional: UserEntity;
    createdAt: Date;
    emailSent: boolean;
    whatsappSent: boolean;
}
