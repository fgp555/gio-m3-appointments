import { Router } from "express";
import { createUser, loginUser, getUsers,getUserById, deleteUser } from "../controllers/usersControllers";
import * as appointmentController from '../controllers/appointmentController';
import auth from "../middlewares/auth";

const router:Router = Router();


// Rutas de Usuarios
router.get('/users',auth, getUsers);
router.post('/users/login',loginUser);
router.get('/users/:id',getUserById);
router.post('/users/register',createUser);
router.delete("/users", deleteUser);
// router.post("/users", createUser);
// router.get("/users",auth, getUsers);
// router.delete("/users", deleteUser);

// Rutas de Turnos
router.get('/appointments', appointmentController.getAppointments);
router.get('/appointment', appointmentController.getAppointment);
router.post('/appointment/schedule', appointmentController.scheduleAppointment);
router.put('/appointment/cancel', appointmentController.cancelAppointment);

export default router;