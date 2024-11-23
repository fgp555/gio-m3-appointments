import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserEntity } from "./userEntity";

@Entity({ name: "appointmen_table" })
export class AppointmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: "time", nullable: true })
  time: Date;

  @Column({ nullable: true })
  status: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  userId: UserEntity;
}
