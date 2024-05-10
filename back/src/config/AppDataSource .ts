import { DataSource } from "typeorm"
import {  UserEntity } from "../entities/userEntity"
import {  CredentialEntity } from "../entities/credentialEntity"
import {  AppointmentEntity } from "../entities/appointmentsEntity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Giovanna2024",
    database: "consultoriodb",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [UserEntity,CredentialEntity,AppointmentEntity],
    subscribers: [],
    migrations: [],
})

export const UserModel = AppDataSource.getRepository(UserEntity)
export const CredentialModel = AppDataSource.getRepository(CredentialEntity)
export const AppointmentModel = AppDataSource.getRepository(AppointmentEntity)