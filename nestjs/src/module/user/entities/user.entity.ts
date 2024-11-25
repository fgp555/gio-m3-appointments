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

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100 })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 100 })
  birthdate: string;

  @Column({ length: 100 })
  nDni: string;

  @Column({ nullable: true, default: 'https://bit.ly/fgpImg1' })
  image: string;

  @Column({ nullable: true, default: false })
  isAdmin: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.userId, {
    eager: true,
    cascade: true,
  })
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;
}
