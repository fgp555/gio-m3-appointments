"use strict";
// back\src\routes\usersRouter.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const userRouter = (0, express_1.Router)();
userRouter.get("/", usersControllers_1.getUsers);
userRouter.post("/login", usersControllers_1.loginUser);
userRouter.get("/:id", usersControllers_1.getUserById);
userRouter.post("/register", usersControllers_1.createUser);
userRouter.delete("/", usersControllers_1.deleteUser);
exports.default = userRouter;
