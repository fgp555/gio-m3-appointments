import { Router } from "express";
import { createUser, loginUser, getUsers,getUserById, deleteUser } from "../controllers/usersControllers";
import * as appointmentController from '../controllers/appointmentController';
import auth from "../middlewares/auth";

const router:Router = Router();


export default router;