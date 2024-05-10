import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AppointmentModel, CredentialModel } from '../config/AppDataSource ';
import { CredentialEntity } from './credentialEntity';
import { AppointmentEntity } from './appointmentsEntity';


@Entity({
    name: "users_table"
})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({type: "date"})
    birthdate: Date;

    @Column()
    nDni: string;

    @JoinColumn()
    credentialId: number;

    @OneToMany(() => AppointmentEntity,(appointment => appointment.userId)) 
    appointments: AppointmentEntity[];
}
