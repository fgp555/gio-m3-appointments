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
exports.MailTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_template_entity_1 = require("./entities/mail-template.entity");
const mail_service_1 = require("./mail.service");
let MailTemplatesService = class MailTemplatesService {
    constructor(emailTemplateRepository, mailService) {
        this.emailTemplateRepository = emailTemplateRepository;
        this.mailService = mailService;
    }
    async createTemplate(data) {
        const template = this.emailTemplateRepository.create(data);
        return await this.emailTemplateRepository.save(template);
    }
    async sentMailRegister(body) {
        const templateMail = await this.getTemplateById(1);
        if (!templateMail) {
            throw new common_1.NotFoundException('Plantilla no encontrada');
        }
        const placeholders = { name: body.firstName };
        const personalizedHtml = this.replacePlaceholders(templateMail.htmlContent, placeholders);
        const emailBody = {
            to: body.email,
            subject: templateMail.subject,
            text: body.text || 'Este es el contenido del correo en texto plano',
            html: personalizedHtml,
        };
        try {
            const result = await this.mailService.sendMail(emailBody);
            console.info('Email sent successfully:', result);
            return { message: 'Correo enviado exitosamente', result };
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new common_1.InternalServerErrorException('Error al enviar el correo');
        }
    }
    replacePlaceholders(template, variables) {
        return template.replace(/{{(\w+)}}/g, (_, key) => variables[key] || `{{${key}}}`);
    }
    async createAppointmentTemplate(data) {
        const { date, description, patient, professional, status } = data;
        const formattedDate = new Date(date).toLocaleString('es-ES', {
            timeZone: 'America/Argentina/Buenos_Aires',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
        const patientName = `${patient.firstName} ${patient.lastName}`;
        const professionalTitle = professional.title || '';
        const professionalName = `${professionalTitle} ${professional.firstName} ${professional.lastName}`;
        const pronoun = professional.gender === 'man' ? 'el' : 'la';
        const templateMailId2 = await this.getTemplateById(2);
        if (!templateMailId2) {
            throw new common_1.NotFoundException('Plantilla no encontrada');
        }
        const placeholders = {
            name: patientName,
            formattedDate: formattedDate,
            professionalName: `${pronoun} ${professionalName}`,
            description: description,
            status: status === 'PENDING' ? 'Pendiente' : status,
        };
        const personalizedHtml = this.replacePlaceholders(templateMailId2.htmlContent, placeholders);
        const personalizedText = this.replacePlaceholders(templateMailId2.text, placeholders);
        const emailBody = {
            to: patient.email,
            subject: templateMailId2.subject,
            text: personalizedText || 'Este es el contenido del correo en texto plano',
            html: personalizedHtml,
        };
        try {
            const result = await this.mailService.sendMail(emailBody);
            console.info('Email sent successfully:', result);
            return { message: 'Correo enviado exitosamente', result };
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new common_1.InternalServerErrorException('Error al enviar el correo');
        }
    }
    async getTemplates() {
        return await this.emailTemplateRepository.find();
    }
    async getTemplateById(id) {
        return await this.emailTemplateRepository.findOne({ where: { id } });
    }
    async updateTemplate(id, data) {
        await this.emailTemplateRepository.update(id, data);
        return await this.getTemplateById(id);
    }
    async deleteTemplate(id) {
        await this.emailTemplateRepository.delete(id);
    }
};
exports.MailTemplatesService = MailTemplatesService;
exports.MailTemplatesService = MailTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mail_template_entity_1.MailTemplate)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], MailTemplatesService);
//# sourceMappingURL=mail-template.service.js.map