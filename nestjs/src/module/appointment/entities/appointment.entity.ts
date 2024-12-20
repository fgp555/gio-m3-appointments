import { UserEntity } from 'src/module/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: [
      'PENDING',
      'CONFIRMED',
      'CANCELED',
      'RESCHEDULED',
      'IN_PROGRESS',
      'COMPLETED',
      'NO_SHOW',
    ],
    default: 'PENDING',
  })
  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'RESCHEDULED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'NO_SHOW';

  @ManyToOne(() => UserEntity, (user) => user.appointmentsAsPatient)
  patient: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.appointmentsAsProfessional)
  professional: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  // Nueva propiedad booleana para saber si se ha enviado el correo electrónico
  @Column({ default: false })
  emailSent: boolean;

  // Nueva propiedad booleana para saber si se ha enviado el mensaje de WhatsApp
  @Column({ default: false })
  whatsappSent: boolean;
}
