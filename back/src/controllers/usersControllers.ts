import { Request, Response } from "express";
import { createUserService, getUsersService, deleteUserService } from "../services/userService";
import IUser from "../interfaces/IUser";


export const createUser =async (req: Request ,res: Response)=>{
    const {name, surname, mail, password, active}= req.body;
    const newUser : IUser= await createUserService ({name, surname, mail, password, active})
    res.status(201).json(newUser)
};

export const loginUser = (req: Request, res: Response) => {
    res.send('Login del usuario a la aplicación');
  };
  
export const getUsers = async (req: Request ,res: Response)=>{
    const users: IUser[]= await getUsersService();
    res.status(200).json(users)
};

export const getUserById = (req: Request, res: Response) => {
    res.send('Obtener el detalle de un usuario específico');
  };

export const deleteUser = async(req: Request ,res: Response)=>{
    const {id} = req.body;
    await deleteUserService(id);
    res.status(200).json({message: "eliminado correctamente"})
};


