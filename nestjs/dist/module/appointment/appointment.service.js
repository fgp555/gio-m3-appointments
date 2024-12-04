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
const mail_template_service_1 = require("../mail/mail-template.service");
let AppointmentService = class AppointmentService {
    constructor(appointmentRepository, userService, emailTemplatesService) {
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
        this.emailTemplatesService = emailTemplatesService;
    }
    async create(appointmentData) {
        const { patient, professional } = appointmentData;
        const foundPatient = await this.userService.findByIdforSeeder(patient.id);
        if (!foundPatient) {
            throw new common_1.NotFoundException(`Patient with ID ${patient.id} not found`);
        }
        const foundProfessional = await this.userService.findByIdforSeeder(professional.id);
        if (!foundProfessional) {
            throw new common_1.NotFoundException(`professional with ID ${professional.id} not found`);
        }
        const appointment = this.appointmentRepository.create(appointmentData);
        const result = await this.appointmentRepository.save(appointment);
        return result;
    }
    async findAll() {
        return await this.appointmentRepository.find({
            order: { date: 'ASC', id: 'ASC' },
            relations: ['patient', 'professional'],
            select: {
                id: true,
                date: true,
                description: true,
                status: true,
                createdAt: true,
                patient: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    whatsapp: true,
                },
                professional: {
                    id: true,
                    title: true,
                    firstName: true,
                    lastName: true,
                    gender: true,
                },
            },
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['patient', 'professional'],
        });
        if (!appointment)
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        return appointment;
    }
    async findPendingAppointmentsByProfessionalId(professionalId) {
        const today = new Date().toISOString().split('T')[0];
        return await this.appointmentRepository.find({
            where: {
                date: (0, typeorm_2.MoreThanOrEqual)(today),
                professional: { id: professionalId },
            },
            relations: ['patient', 'professional'],
            select: {
                id: true,
                date: true,
                description: true,
                status: true,
                createdAt: true,
                patient: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    whatsapp: true,
                },
                professional: {
                    id: true,
                    title: true,
                    firstName: true,
                    lastName: true,
                    gender: true,
                },
            },
            order: { date: 'ASC' },
        });
    }
    async findLast(count) {
        return await this.appointmentRepository.find({
            order: { createdAt: 'DESC' },
            take: Number(count),
            relations: ['patient', 'professional'],
            select: {
                id: true,
                date: true,
                description: true,
                status: true,
                createdAt: true,
                patient: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    whatsapp: true,
                },
                professional: {
                    id: true,
                    title: true,
                    firstName: true,
                    lastName: true,
                    gender: true,
                },
            },
        });
    }
    async update(id, appointmentData) {
        const appointment = await this.findOne(id);
        Object.assign(appointment, appointmentData);
        return await this.appointmentRepository.save(appointment);
    }
    async delete(id) {
        const result = await this.appointmentRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
    async findOneByDateAndDescription(date, description) {
        return this.appointmentRepository.findOne({
            where: { date, description },
        });
    }
    async cancel(id) {
        const appointment = await this.findOne(id);
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        appointment.status = 'CANCELED';
        return await this.appointmentRepository.save(appointment);
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        mail_template_service_1.MailTemplatesService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map