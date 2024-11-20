// back\src\services\userService.ts

import { UserModel } from "../config/AppDataSource ";
import UserDto from "../dto/userDto";
import { UserEntity } from "../entities/userEntity";
import { createCredentialService, validateCredentialsService } from "./credentialsService";

export const getUsersService = async (): Promise<UserEntity[]> => {
  const users = await UserModel.find({
    relations: { appointments: true },
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<UserEntity | null> => {
  const user = await UserModel.findOneOrFail({
    where: { id: id },
    relations: { appointments: true },
  });
  user.appointments.sort((a, b) => b.id - a.id);
  return user;
};
export const loginUserService = async (username: string, password: string): Promise<UserEntity | null> => {
  const credentialId = await validateCredentialsService(username, password);
  if (!credentialId) {
    throw new Error("Credenciales incorrectas");
  }
  const userFound = await UserModel.findOneBy({ id: credentialId });
  return userFound;
};

export const createUserService = async (userDataObject: UserDto): Promise<UserEntity> => {
  const { firstName, lastName, email, username, password, birthdate, nDni } = userDataObject;
  const credentialIdReturn = await createCredentialService(username, password);
  const ObjectUserModel = { firstName, lastName, email, birthdate, nDni, credentialId: credentialIdReturn };
  const userCreate = await UserModel.create(ObjectUserModel);
  const userSave = await UserModel.save(userCreate);
  return userSave;
};

export const deleteUserService = async (id: number) /* :Promise<UserEntity> */ => {
  const UserDelete = await UserModel.delete({ id });
  return UserDelete;
};
