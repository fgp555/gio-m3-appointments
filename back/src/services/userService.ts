import IUser from "../interfaces/IUser";
import IUserDto from "../dto/userDto";
import { promises } from "dns";

let users: IUser[] =[{
    id: 1,
    name :"Gio",
    surname: "m",
    mail: "gm@mail",
    password: 122,
    active: true,
}
]

let id: number = 2; 

export const createUserService =async (userData: IUserDto): Promise <IUser> =>{
    const newUser: IUser ={
        id,
        name : userData.name,
        surname: userData.surname,
        mail: userData.mail,
        password: userData.password,
        active: userData.active
    }
    users.push(newUser)
    id++
    return newUser
};

export const getUsersService = async (): Promise<IUser[]> =>{
    return users;
};

export const deleteUserService = async(id:number):Promise<void> =>{
    users = users.filter((user: IUser)=>{
        return user.id !== id
    })
};