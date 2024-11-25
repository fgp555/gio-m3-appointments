import express from "express";
import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/AppDataSource ";

AppDataSource.initialize().then((res) => {
  console.log("conexion a la base de datos realizada con exito");
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
});

const app = express();
