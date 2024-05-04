import  ICredential  from "../interfaces/ICredential";
// Arreglo para almacenar los datos de las credenciales
const credentials: ICredential[] = [{
  username: "admit1",
  password: "123",}
];


// export const credentialService = {
  export const createCredentialService = (username: string, password: string): number => {
    // Generar un nuevo ID para las credenciales
    const newCredentialId = credentials.length + 1;
    // Crear un nuevo par de credenciales con los datos proporcionados
    const newCredential: ICredential = {
      id: newCredentialId,
      username: username,
      password: password,
    };
       credentials.push(newCredential);
        return newCredentialId;
  }

export const validateCredentialsService = (username: string, password: string): number | null => {
    // Buscar las credenciales por el nombre de usuario
    const foundCredential = credentials.find(cred => cred.username === username);
    // Si no se encuentran las credenciales, retornar null
    if (!foundCredential) {
      return null;
    }
    // Verificar si la contraseña coincide con la contraseña almacenada
    if (foundCredential.password === password) {
      // Retornar el ID de las credenciales si la validación es exitosa
      return Number(foundCredential.id);
    } else {
      // Retornar null si la contraseña no coincide
      return null;
    }
  }
// };
