import { promises } from "dns";
import { CredentialModel } from "../config/AppDataSource ";
import  ICredential  from "../interfaces/ICredential";

// const credentials: ICredential[] = [{
//   username: "admit1",
//   password: "123",}
// ];


// export const credentialService = {
  export const createCredentialService = async (username: string, password: string): Promise<number> => {
    const newCredential: ICredential = {
      username: username,
      password: password,
    };
    const createCredential = CredentialModel.create(newCredential)
    const saveCredential= await CredentialModel.save(createCredential)
        return saveCredential.id
  }

export const validateCredentialsService = async(username: string, password: string):Promise <number | null> => {
    console.log(username)
    // const foundCredential = credentials.find(cred => cred.username === username);
    const foundCredential = await CredentialModel.findOneBy({username})
    if (!foundCredential) {
      return null;
    }
    if (foundCredential.password === password) {
      return Number(foundCredential.id);
    } else {
      // Retornar null si la contraseña no coincide
      return null;
    }
  }
// };
