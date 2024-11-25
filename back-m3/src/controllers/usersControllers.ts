// back\src\controllers\usersControllers.ts

import { Request, Response } from "express";
import { createUserService, getUsersService, getUserByIdService, deleteUserService, loginUserService } from "../services/userService";
import { UserEntity } from "../entities/userEntity";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, username, password, birthdate, nDni } = req.body;
    const newUser = await createUserService({ firstName, lastName, email, username, password, birthdate, nDni });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send(" los datos son incorrectos");
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const returnLoginService = await loginUserService(username, password);
    res.status(200).json({ login: true, user: returnLoginService });
  } catch (error) {
    console.error(error);
    res.status(400).json({ login: false, message: " los datos son incorrectos" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: UserEntity[] = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(404).send("el usuario no fue encontrado.");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: UserEntity | null = await getUserByIdService(Number(id));
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).send("el usuario no fue encontrado.");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await deleteUserService(id);
    res.status(200).json({ message: "eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(400).send("usuario no encontrado");
  }
};
