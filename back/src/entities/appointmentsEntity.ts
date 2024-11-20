import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./userEntity";

@Entity({ name: "appointmen_table" })
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  time: Date;

  @Column()
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  userId: UserEntity;
}
