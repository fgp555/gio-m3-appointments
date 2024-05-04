interface IUser {
    id? : number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthdate: Date;
    nDni: string;
    credentialsId: number;
}

export default IUser