"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModel = exports.CredentialModel = exports.UserModel = exports.AppDataSource = void 0;
const envs_1 = require("./envs");
const typeorm_1 = require("typeorm");
const userEntity_1 = require("../entities/userEntity");
const credentialEntity_1 = require("../entities/credentialEntity");
const appointmentsEntity_1 = require("../entities/appointmentsEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: envs_1.DROPSCHEMA,
    dropSchema: envs_1.DROPSCHEMA,
    logging: false,
    entities: [userEntity_1.UserEntity, credentialEntity_1.CredentialEntity, appointmentsEntity_1.AppointmentEntity],
    subscribers: [],
    migrations: [],
});
exports.UserModel = exports.AppDataSource.getRepository(userEntity_1.UserEntity);
exports.CredentialModel = exports.AppDataSource.getRepository(credentialEntity_1.CredentialEntity);
exports.AppointmentModel = exports.AppDataSource.getRepository(appointmentsEntity_1.AppointmentEntity);
