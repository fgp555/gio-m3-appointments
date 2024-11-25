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
const createAppointmentService = (userId, date, time, description) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUserId = yield AppDataSource_1.UserModel.findOneBy({ id: userId });
    if (!foundUserId) {
        throw new Error("El usuario no existe");
    }
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: ENV_USER,
    //     pass: ENV_PASSAPP,
    //   },
    // });
    // const mailOptions = {
    //   from: ENV_USER,
    //   to: foundUserId.email,
    //   subject: "Gracias por agendar tu turno",
    //   text: `tienes reservado un turno `,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   }
    //   console.log(`Email sent to ${foundUserId.email} ` + info.response);
    // });
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
