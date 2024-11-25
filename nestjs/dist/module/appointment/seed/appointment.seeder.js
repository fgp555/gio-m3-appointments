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
        this.seed();
    }
    async seed() {
        const appointments = [
            {
                date: '2024-11-25T10:00:00.000Z',
                description: 'Meeting with Team A',
                userId: 1,
            },
            {
                date: '2024-11-26T11:00:00.000Z',
                description: 'Client presentation',
                userId: 2,
            },
            {
                date: '2024-11-27T09:00:00.000Z',
                description: 'Team building event',
                userId: 1,
            },
        ];
        for (const appointment of appointments) {
            try {
                const user = await this.userService.findById(appointment.userId);
                if (!user) {
                    console.log(`User with ID ${appointment.userId} does not exist.`);
                    continue;
                }
                await this.appointmentService.create(appointment);
                console.log(`Appointment on ${appointment.date} created successfully.`);
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