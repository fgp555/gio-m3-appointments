import { Entity, PrimaryGeneratedColumn, Column, OneToOne,JoinColumn } from 'typeorm';
import { UserModel } from '../config/AppDataSource ';
import { UserEntity } from './userEntity';

@Entity({name: "credential_table"})
export class CredentialEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

}
