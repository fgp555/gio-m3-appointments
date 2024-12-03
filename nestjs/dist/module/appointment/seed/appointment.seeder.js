"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSeederService = void 0;
const common_1 = require("@nestjs/common");
const appointment_service_1 = require("../appointment.service");
const user_service_1 = require("../../user/user.service");
let AppointmentSeederService = class AppointmentSeederService {
    constructor(appointmentService, userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }
    async seed() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 3);
        const nextWeekMonday = new Date(today);
        nextWeekMonday.setDate(today.getDate() + (7 - today.getDay()));
        const nextWeekTuesday = new Date(nextWeekMonday);
        nextWeekTuesday.setDate(nextWeekMonday.getDate() + 1);
        const nextWeekWednesday = new Date(nextWeekMonday);
        nextWeekWednesday.setDate(nextWeekMonday.getDate() + 2);
        const nextWeekThursday = new Date(nextWeekMonday);
        nextWeekThursday.setDate(nextWeekMonday.getDate() + 3);
        const nextWeekFriday = new Date(nextWeekMonday);
        nextWeekFriday.setDate(nextWeekMonday.getDate() + 4);
        const appointments = [
            {
                date: today.toISOString(),
                description: 'Sesión de rehabilitación postoperatoria de rodilla',
                patient: { id: 1 },
                professional: { id: 9 },
            },
            {
                date: today.toISOString(),
                description: 'Tratamiento para dolor lumbar crónico con técnicas de terapia manual',
                patient: { id: 2 },
                professional: { id: 10 },
            },
            {
                date: today.toISOString(),
                description: 'Ejercicios de fortalecimiento para esguince de tobillo',
                patient: { id: 3 },
                professional: { id: 10 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Sesión de electroterapia para alivio del dolor en hombro',
                patient: { id: 4 },
                professional: { id: 8 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Estiramientos y masajes para contractura muscular en cuello',
                patient: { id: 5 },
                professional: { id: 9 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Revisión de progreso en tratamiento de fascitis plantar',
                patient: { id: 6 },
                professional: { id: 10 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Terapia de rehabilitación después de fractura de brazo',
                patient: { id: 7 },
                professional: { id: 8 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Ejercicios de movilidad para mejorar rango articular en rodilla',
                patient: { id: 1 },
                professional: { id: 10 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Plan de fortalecimiento muscular para prevención de lesiones',
                patient: { id: 2 },
                professional: { id: 10 },
            },
            {
                date: nextWeekTuesday.toISOString(),
                description: 'Consulta de control postoperatorio de rodilla',
                patient: { id: 3 },
                professional: { id: 8 },
            },
            {
                date: nextWeekTuesday.toISOString(),
                description: 'Tratamiento de masajes terapéuticos para cuello',
                patient: { id: 4 },
                professional: { id: 9 },
            },
            {
                date: nextWeekThursday.toISOString(),
                description: 'Rehabilitación para esguince de tobillo',
                patient: { id: 5 },
                professional: { id: 10 },
            },
            {
                date: nextWeekThursday.toISOString(),
                description: 'Evaluación de progreso en tratamiento de fascitis plantar',
                patient: { id: 6 },
                professional: { id: 8 },
            },
            {
                date: nextWeekFriday.toISOString(),
                description: 'Ejercicios de fortalecimiento para la parte inferior de la espalda',
                patient: { id: 7 },
                professional: { id: 9 },
            },
            {
                date: nextWeekFriday.toISOString(),
                description: 'Terapia de rehabilitación para fractura de brazo',
                patient: { id: 1 },
                professional: { id: 10 },
            },
            {
                date: nextWeekFriday.toISOString(),
                description: 'Consulta de control postoperatorio de rodilla',
                patient: { id: 2 },
                professional: { id: 8 },
            },
            {
                date: nextWeekFriday.toISOString(),
                description: 'Tratamiento de masajes terapéuticos para cuello',
                patient: { id: 3 },
                professional: { id: 10 },
            },
        ];
        for (const appointment of appointments) {
            try {
                const patient = await this.userService.findByIdforSeeder(appointment.patient.id);
                const professional = await this.userService.findByIdforSeeder(appointment.professional.id);
                if (!patient || !professional) {
                    console.log(`Patient with ID ${appointment.patient.id} or professional with ID ${appointment.professional.id} does not exist.`);
                    continue;
                }
                await this.appointmentService.create(appointment);
                console.log(`Appointment on ${appointment.date} for Patient ${appointment.patient.id} and professional ${appointment.professional.id} created successfully.`);
            }
            catch (error) {
                console.error(`Failed to create appointment on ${appointment.date}: ${error.message}`);
            }
        }
    }
};
exports.AppointmentSeederService = AppointmentSeederService;
exports.AppointmentSeederService = AppointmentSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        user_service_1.UserService])
], AppointmentSeederService);
//# sourceMappingURL=appointment.seeder.js.map