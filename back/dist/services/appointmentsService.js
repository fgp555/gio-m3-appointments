"use strict";
// back\src\services\appointmentsService.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentService = exports.createAppointmentService = exports.getAppointmentByIdService = exports.getAppointmentsService = void 0;
const AppDataSource_1 = require("../config/AppDataSource ");
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield AppDataSource_1.AppointmentModel.find({
        relations: {
            userId: true,
        },
    });
    return appointments;
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppDataSource_1.AppointmentModel.findOneBy({
        id,
    });
    if (!appointment) {
        throw new Error("El turno no existe");
    }
    return appointment;
});
exports.getAppointmentByIdService = getAppointmentByIdService;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../config/envs");
const createAppointmentService = (userId, date, time, description) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUserId = yield AppDataSource_1.UserModel.findOneBy({ id: userId });
    if (!foundUserId) {
        throw new Error("El usuario no existe");
    }
    const userGmail = envs_1.USER;
    const passAppGmail = envs_1.PASSAPP;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: userGmail,
            pass: passAppGmail,
        },
    });
    const mailOptions = {
        from: userGmail,
        to: foundUserId.email,
        subject: "Gracias por agendar tu turno",
        text: `tienes reservado un turno `,
    };
    console.log(foundUserId.appointments);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log("Email sent: " + info.response);
    });
    const newObject = { date, time, status: "active", userId: foundUserId, description };
    const appointmentSave = yield AppDataSource_1.AppointmentModel.save(newObject);
    return appointmentSave;
});
exports.createAppointmentService = createAppointmentService;
const cancelAppointmentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield AppDataSource_1.AppointmentModel.findOneBy({ id });
    if (!appointment) {
        throw new Error("El turno no existe");
    }
    appointment.status = "cancelled";
    yield AppDataSource_1.AppointmentModel.save(appointment);
});
exports.cancelAppointmentService = cancelAppointmentService;
