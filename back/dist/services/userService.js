"use strict";
// back\src\services\userService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.createUserService = exports.loginUserService = exports.getUserByIdService = exports.getUsersService = void 0;
const AppDataSource_1 = require("../config/AppDataSource ");
const credentialsService_1 = require("./credentialsService");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield AppDataSource_1.UserModel.find({
        relations: { appointments: true },
    });
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield AppDataSource_1.UserModel.findOneOrFail({
        where: { id: id },
        relations: { appointments: true },
    });
    user.appointments.sort((a, b) => b.id - a.id);
    console.log(user);
    return user;
});
exports.getUserByIdService = getUserByIdService;
const loginUserService = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialsService_1.validateCredentialsService)(username, password);
    if (!credentialId) {
        throw new Error("Credenciales incorrectas");
    }
    const userFound = yield AppDataSource_1.UserModel.findOneBy({ id: credentialId });
    return userFound;
});
exports.loginUserService = loginUserService;
const createUserService = (userDataObject) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, username, password, birthdate, nDni } = userDataObject;
    const credentialIdReturn = yield (0, credentialsService_1.createCredentialService)(username, password);
    const ObjectUserModel = { firstName, lastName, email, birthdate, nDni, credentialId: credentialIdReturn };
    const userCreate = yield AppDataSource_1.UserModel.create(ObjectUserModel);
    const userSave = yield AppDataSource_1.UserModel.save(userCreate);
    return userSave;
});
exports.createUserService = createUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const UserDelete = yield AppDataSource_1.UserModel.delete({ id });
    return UserDelete;
});
exports.deleteUserService = deleteUserService;
