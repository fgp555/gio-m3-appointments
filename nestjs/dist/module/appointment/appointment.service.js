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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const user_service_1 = require("../user/user.service");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, userService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }
    async create(createAppointmentDto) {
        const { date, description, userId } = createAppointmentDto;
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} does not exist.`);
        }
        const appointment = this.appointmentRepository.create({
            date: createAppointmentDto.date,
            description: createAppointmentDto.description,
            userId: user,
        });
        return this.appointmentRepository.save(appointment);
    }
    async findAll() {
        return this.appointmentRepository.find({
            relations: { userId: true },
        });
    }
    async findOne(id) {
        return this.appointmentRepository.findOne({ where: { id } });
    }
    async update(id, updateAppointmentDto) {
        await this.appointmentRepository.update(id, updateAppointmentDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.appointmentRepository.delete(id);
    }
    async findOneByDateAndDescription(date, description) {
        return this.appointmentRepository.findOne({
            where: { date, description },
        });
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map