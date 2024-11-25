"use strict";
// back\src\controllers\usersControllers.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserById = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const userService_1 = require("../services/userService");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, username, password, birthdate, nDni } = req.body;
        const newUser = yield (0, userService_1.createUserService)({ firstName, lastName, email, username, password, birthdate, nDni });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(400).send(" los datos son incorrectos");
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const returnLoginService = yield (0, userService_1.loginUserService)(username, password);
        res.status(200).json({ login: true, user: returnLoginService });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ login: false, message: " los datos son incorrectos" });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(404).send("el usuario no fue encontrado.");
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(404).send("el usuario no fue encontrado.");
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        yield (0, userService_1.deleteUserService)(id);
        res.status(200).json({ message: "eliminado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(400).send("usuario no encontrado");
    }
});
exports.deleteUser = deleteUser;
