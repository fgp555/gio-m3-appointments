"use strict";
// back\src\controllers\appointmentController.ts
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
exports.cancelAppointment = exports.scheduleAppointment = exports.getAppointmentById = exports.getAppointments = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointmentsService_1.getAppointmentsService)();
        res.status(200).json(appointments);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});
exports.getAppointments = getAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = parseInt(req.params.id);
        const appointment = yield (0, appointmentsService_1.getAppointmentByIdService)(appointmentId);
        res.status(200).json(appointment);
    }
    catch (error) {
        console.error(error);
        res.status(404).send("turno no fue encontrado");
    }
});
exports.getAppointmentById = getAppointmentById;
const scheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, date, time, description } = req.body;
        yield (0, appointmentsService_1.createAppointmentService)(userId, date, time, description);
        res.status(201).send("Turno creado correctamente");
    }
    catch (error) {
        console.error(error);
        res.status(400).send("los datos son incorrectos");
    }
});
exports.scheduleAppointment = scheduleAppointment;
const cancelAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = parseInt(req.params.id);
        yield (0, appointmentsService_1.cancelAppointmentService)(appointmentId);
        res.status(200).send("Turno cancelado correctamente");
    }
    catch (error) {
        console.error(error);
        res.status(404).send(" el turno no fue encontrado");
    }
});
exports.cancelAppointment = cancelAppointment;
