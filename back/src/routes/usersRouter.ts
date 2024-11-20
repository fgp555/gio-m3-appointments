// back\src\routes\usersRouter.ts

import { Router } from "express";
import { createUser, loginUser, getUsers, getUserById, deleteUser } from "../controllers/usersControllers";

const userRouter: Router = Router();

userRouter.get("/", getUsers);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUserById);
userRouter.post("/register", createUser);
userRouter.delete("/", deleteUser);

export default userRouter;
