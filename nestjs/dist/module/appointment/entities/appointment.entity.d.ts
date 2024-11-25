import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class Appointment {
    id: number;
    date: string;
    description: string;
    patient: UserEntity;
    doctor: UserEntity;
}
