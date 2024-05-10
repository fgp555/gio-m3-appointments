import express from 'express';
import server from "./server";
import indexRouter from './routes/indexRouter';
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from './config/AppDataSource ';
import { resolve } from 'path';

AppDataSource.initialize()
.then(res=>{
    console.log("conexion a la base de datos realizada con exito");
    server.listen(PORT,()=>{
        console.log(`server listening on port ${PORT}`);
    })
})




// server.listen (PORT, () =>{
//     console.log(`server listening on port ${PORT}`);
// });


const app = express();



// const PORT = process.env.PORT || 3000;




// const test:string = "prueba1"


// console.log(test)

// interface IUser {
//     name: string;
//     email: string;
//     age: number;
// }

// interface IClient extends IUser{
//     isClient : boolean;
// }

// interface IConsultorio {
//     local : string;
//     clientes: IUser[]
// }

// const usuario1:IClient = {
//     name : "maria",
//     email: "maria@mail",
//     age: 25,
//     isClient: true,
// }
// const consultorio1: IConsultorio ={
//      local : "local1",
//      clientes: [usuario1],
// }

// // console.log(consultorio1)


// function consultorio1Funcion(parametro1:object):object{
//     return parametro1
// }
// // console.log(consultorio1Funcion(consultorio1))


// const suma = (num1:number, num2:number):string=> {
// return num1 + num2+ "num"
// }
// console.log(suma (2,4))

// const resta = (num1:number, num2:number): void =>{
//      console.log(num1- num2)
// }
// resta(5,3)