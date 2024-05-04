import { Router } from "express";
import { createUser, loginUser, getUsers,getUserById, deleteUser } from "../controllers/usersControllers";
import * as appointmentController from '../controllers/appointmentController';
import router from './indexRouter';


router.get('/appointments', appointmentController.getAppointments);
router.get('/appointment', appointmentController.getAppointments);
router.post('/appointment/schedule', appointmentController.scheduleAppointment);
router.put('/appointment/cancel', appointmentController.cancelAppointment);


export default router;