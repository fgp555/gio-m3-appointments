// back\src\routes\appointmentsRouter.ts

import { Router } from "express";
import * as appointmentController from "../controllers/appointmentController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", appointmentController.getAppointments);
appointmentRouter.get("/:id", appointmentController.getAppointmentById);
appointmentRouter.post("/schedule", appointmentController.scheduleAppointment);
appointmentRouter.put("/cancel/:id", appointmentController.cancelAppointment);

export default appointmentRouter;
