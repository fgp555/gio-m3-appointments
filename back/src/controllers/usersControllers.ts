import { Request, Response } from "express";
import { createUserService, getUsersService, getUserByIdService, deleteUserService } from "../services/userService";
import IUser from "../interfaces/IUser";


export const createUser =async (req: Request ,res: Response): Promise<void>=>{
  try {  
  const {firstName, lastName, email, password, birthdate,nDni,credentialsId}= req.body;
    const newUser : IUser= await createUserService ({ firstName, lastName, email, password, birthdate,nDni,credentialsId})
    res.status(201).json(newUser)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};


export const loginUser = (req: Request, res: Response) => {
    res.send('Login del usuario a la aplicación');
  };
  
export const getUsers = async (req: Request ,res: Response)=>{
  try {
    const users: IUser[]= await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getUserById = async (req: Request, res: Response) : Promise<void>=> {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserByIdService(userId);
    if (!user) {
    res.status(404).send('Usuario no encontrado');
      } else {
      res.status(200).json(user);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};
   

export const deleteUser = async(req: Request ,res: Response)=>{
    const {id} = req.body;
    await deleteUserService(id);
    res.status(200).json({message: "eliminado correctamente"})
};


