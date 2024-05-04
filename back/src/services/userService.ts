import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser";
// import IUserDto from "../dto/userDto";
import { createCredentialService,validateCredentialsService } from "./credentialsService"; 

let id: number = 1; 
const usersTempData: IUser[] = [
    {
        id: 1,
        firstName :"Gio",
        lastName: "m",
        email: "gm@mail",
        password: "123",
        birthdate:  new Date("1995-10-17"),
        nDni: "1542633",
        credentialsId: 4,
    }
    ];


export const getUsersService = async (): Promise<IUser[]> => {
    return usersTempData;
};

export const getUserByIdService = async (userId: number): Promise<IUser | null> => {
    const user = usersTempData.find(user => user.id === userId);
    return user ? user : null;
};

export const loginUserService = async (credentialData:ICredential ): Promise <number  | null> => {
    const { username, password}= credentialData;
    const credentialId =validateCredentialsService(username,password)
    return credentialId
}

export const createUserService = async (userData: IUser): Promise<IUser> => {
    // Crear las credenciales para el nuevo usuario
    const credentialsId = createCredentialService(userData.email, userData.password);
    // Crear un nuevo usuario con los datos proporcionados
    const newUser: IUser = {
        id:usersTempData.length+1,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId, // Asignar el ID de las credenciales al usuario
    };
    usersTempData.push(newUser); // Agregar el nuevo usuario al arreglo
    id++;
    return newUser;
};

export const deleteUserService = async(id:number):Promise<void> =>{
   usersTempData.filter((user: IUser)=>{
        return user.id !== id
    })
};



