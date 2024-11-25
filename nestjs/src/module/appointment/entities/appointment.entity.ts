// src/appointment/appointment.entity.ts
import { UserEntity } from 'src/module/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.appointmentsAsPatient)
  patient: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.appointmentsAsDoctor)
  doctor: UserEntity;
}
