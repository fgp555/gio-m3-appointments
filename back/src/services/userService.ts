import { AppDataSource, UserModel } from "../config/AppDataSource ";
import UserDto from "../dto/userDto";
import { AppointmentEntity } from "../entities/appointmentsEntity";
import { UserEntity } from "../entities/userEntity";
import { createCredentialService,validateCredentialsService } from "./credentialsService"; 

// let id: number = 1; 
// const usersTempData: UserDto[] = [
//     {
//         firstName :"Gio",
//         lastName: "m",
//         email: "gm@mail",
//         username:"gm",
//         password: "123",
//         birthdate:  new Date("3-12-1992"),
//         nDni: "1542633",
//         credentialsId: 4,
    // }
    // ];


export const getUsersService = async (): Promise<UserEntity[]>=> {
const users = await UserModel.find({
    relations:
    {appointments:true}
})
return users;
};

export const getUserByIdService = async (id: number): Promise<UserEntity | null> => {
    const user = await UserModel.findOneBy({
        id
    })
    return user 
};
export const loginUserService = async (username: string, password: string): Promise<number | null>  => {
    const credentialId = await validateCredentialsService(username, password);
    return credentialId;
  };


  
export const createUserService = async (userDataObject: UserDto): Promise<UserEntity>  => {
    const {firstName, lastName, email, username, password, birthdate,nDni}=userDataObject
    const credentialIdReturn = await createCredentialService(username,password)
const ObjectUserModel = {firstName, lastName, email, birthdate,nDni,credentialsId:credentialIdReturn}
    const userCreate = await UserModel.create(ObjectUserModel)
    const userSave = await UserModel.save(userCreate);
    return userSave;
};
 
export const deleteUserService = async(id:number)/* :Promise<UserEntity> */ =>{
   const UserDelete = await UserModel.delete({ id });
   return UserDelete
};



