// back\src\services\credentialsService.ts

import { CredentialModel } from "../config/AppDataSource ";
import ICredential from "../interfaces/ICredential";

export const createCredentialService = async (username: string, password: string): Promise<number> => {
  const newCredential: ICredential = {
    username: username,
    password: password,
  };
  const createCredential = CredentialModel.create(newCredential);
  const saveCredential = await CredentialModel.save(createCredential);
  return saveCredential.id;
};

export const validateCredentialsService = async (username: string, password: string): Promise<number | null> => {
  const foundCredential = await CredentialModel.findOneBy({ username });
  if (!foundCredential) {
    return null;
  }
  if (foundCredential.password === password) {
    return Number(foundCredential.id);
  } else {
    return null;
  }
};
