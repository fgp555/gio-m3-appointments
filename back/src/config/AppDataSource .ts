import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DB_TYPE, DROPSCHEMA } from "./envs";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/userEntity";
import { CredentialEntity } from "../entities/credentialEntity";
import { AppointmentEntity } from "../entities/appointmentsEntity";


export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DROPSCHEMA,
  dropSchema: DROPSCHEMA,
  logging: false,
  entities: [UserEntity, CredentialEntity, AppointmentEntity],
  subscribers: [],
  migrations: [],
});

export const UserModel = AppDataSource.getRepository(UserEntity);
export const CredentialModel = AppDataSource.getRepository(CredentialEntity);
export const AppointmentModel = AppDataSource.getRepository(AppointmentEntity);
