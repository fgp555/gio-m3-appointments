import { Appointment } from 'src/module/appointment/entities/appointment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ length: 100, nullable: true })
  username: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ length: 100, nullable: true })
  birthdate: string;

  @Column({ length: 100, nullable: true })
  nDni: string;

  @Column({ nullable: true, default: 'https://bit.ly/fgpImg1' })
  image: string;

  @Column({
    type: 'enum',
    enum: ['patient', 'professional', 'admin'],
    default: 'patient',
  })
  role: 'patient' | 'professional' | 'admin';

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ length: 255, nullable: true })
  specialization: string;

  @Column({ length: 1000, nullable: true })
  bio: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    // cascade: true,
    // eager: true,
  })
  appointmentsAsPatient: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.professional, {
    // cascade: true,
    // eager: true,
  })
  appointmentsAsProfessional: Appointment[];

  @CreateDateColumn()
  createdAt: Date;
}
