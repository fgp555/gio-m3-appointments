import { Router } from "express";
import { createUser, loginUser, getUsers,getUserById, deleteUser } from "../controllers/usersControllers";
import * as appointmentController from '../controllers/appointmentController';
import auth from "../middlewares/auth";
import router from "./indexRouter";


router.get('/users',auth, getUsers);
router.post('/users/login',loginUser);
router.get('/users/:id',getUserById);
router.post('/users/register',createUser);
router.delete("/users", deleteUser);


export default router;