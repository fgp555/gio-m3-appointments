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
        const appointments = [
            {
                date: today.toISOString(),
                description: 'Task 1 for today',
                patient: { id: 1 },
                doctor: { id: 2 },
            },
            {
                date: today.toISOString(),
                description: 'Task 2 for today',
                patient: { id: 2 },
                doctor: { id: 3 },
            },
            {
                date: today.toISOString(),
                description: 'Task 3 for today',
                patient: { id: 3 },
                doctor: { id: 1 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Task 1 for tomorrow',
                patient: { id: 1 },
                doctor: { id: 2 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Task 2 for tomorrow',
                patient: { id: 2 },
                doctor: { id: 3 },
            },
            {
                date: tomorrow.toISOString(),
                description: 'Task 3 for tomorrow',
                patient: { id: 3 },
                doctor: { id: 1 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Task 1 for 3 days from now',
                patient: { id: 1 },
                doctor: { id: 2 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Task 2 for 3 days from now',
                patient: { id: 2 },
                doctor: { id: 3 },
            },
            {
                date: threeDaysFromNow.toISOString(),
                description: 'Task 3 for 3 days from now',
                patient: { id: 3 },
                doctor: { id: 1 },
            },
        ];
        for (const appointment of appointments) {
            try {
                const patient = await this.userService.findById(appointment.patientId);
                const doctor = await this.userService.findById(appointment.doctorId);
                if (!patient || !doctor) {
                    console.log(`Patient with ID ${appointment.patientId} or Doctor with ID ${appointment.doctorId} does not exist.`);
                    continue;
                }
                await this.appointmentService.create(appointment);
                console.log(`Appointment on ${appointment.date} for Patient ${appointment.patientId} and Doctor ${appointment.doctorId} created successfully.`);
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