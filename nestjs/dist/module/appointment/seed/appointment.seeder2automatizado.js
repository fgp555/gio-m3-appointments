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
        const generateDates = (startDate, days) => {
            const dates = [];
            for (let i = 0; i < days; i++) {
                const nextDay = new Date(startDate);
                nextDay.setDate(startDate.getDate() + i);
                dates.push(nextDay);
            }
            return dates;
        };
        const therapyDescriptions = [
            'Sesión de rehabilitación postoperatoria de rodilla',
            'Tratamiento para dolor lumbar crónico con técnicas de terapia manual',
            'Ejercicios de fortalecimiento para esguince de tobillo',
            'Sesión de electroterapia para alivio del dolor en hombro',
            'Estiramientos y masajes para contractura muscular en cuello',
            'Revisión de progreso en tratamiento de fascitis plantar',
            'Terapia de rehabilitación después de fractura de brazo',
            'Ejercicios de movilidad para mejorar rango articular en rodilla',
            'Plan de fortalecimiento muscular para prevención de lesiones',
            'Tratamiento de terapia física para recuperación post-quirúrgica de codo',
        ];
        const generateRandomAppointments = (date, patientId, professionalId) => {
            const appointments = [];
            const numAppointments = Math.floor(Math.random() * 3) + 2;
            const availableHours = Array.from({ length: 9 }, (_, i) => i + 9);
            const selectedHours = [];
            while (selectedHours.length < numAppointments) {
                const randomHour = availableHours[Math.floor(Math.random() * availableHours.length)];
                if (!selectedHours.includes(randomHour)) {
                    selectedHours.push(randomHour);
                }
            }
            selectedHours.forEach((hour) => {
                const appointmentDate = new Date(date);
                appointmentDate.setHours(hour, 0, 0, 0);
                const randomDescription = therapyDescriptions[Math.floor(Math.random() * therapyDescriptions.length)];
                appointments.push({
                    date: appointmentDate.toISOString(),
                    description: randomDescription,
                    patient: { id: patientId },
                    professional: { id: professionalId },
                });
            });
            return appointments;
        };
        const thisWeekDates = generateDates(today, 2);
        const mondayNextWeek = new Date(today);
        mondayNextWeek.setDate(today.getDate() + (7 - today.getDay()) + 1);
        const nextWeekStart = new Date(today);
        nextWeekStart.setDate(today.getDate() + (7 - today.getDay()) + 8);
        const nextWeekDates = generateDates(nextWeekStart, 3);
        const thirdWeekStart = new Date(today);
        thirdWeekStart.setDate(today.getDate() + (7 - today.getDay()) + 15);
        const thirdWeekDates = generateDates(thirdWeekStart, 2);
        const appointments = [
            ...thisWeekDates.flatMap((date) => generateRandomAppointments(date, 1, 2)),
            ...[mondayNextWeek].flatMap((date) => generateRandomAppointments(date, 2, 3)),
            ...nextWeekDates.flatMap((date) => generateRandomAppointments(date, 2, 3)),
            ...thirdWeekDates.flatMap((date) => generateRandomAppointments(date, 3, 1)),
        ];
        for (const appointment of appointments) {
            try {
                const patient = await this.userService.findById(appointment.patientId);
                const professional = await this.userService.findById(appointment.professionalId);
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
//# sourceMappingURL=appointment.seeder2automatizado.js.map