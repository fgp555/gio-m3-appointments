"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
require("reflect-metadata");
const AppDataSource_1 = require("./config/AppDataSource ");
AppDataSource_1.AppDataSource.initialize().then((res) => {
    console.log("conexion a la base de datos realizada con exito");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`server listening on port ${envs_1.PORT}`);
    });
});
const app = (0, express_1.default)();
