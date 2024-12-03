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
exports.MailSeederService = void 0;
const common_1 = require("@nestjs/common");
const mail_template_service_1 = require("../mail-template.service");
let MailSeederService = class MailSeederService {
    constructor(emailTemplatesService) {
        this.emailTemplatesService = emailTemplatesService;
    }
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        console.log('Running mail seeder...');
        const templates = [
            {
                templateName: 'Registro de Usuario',
                subject: '¡Bienvenido a nuestro Centro de Fisioterapia!',
                text: '¡Bienvenido a nuestro Centro de Fisioterapia!',
                htmlContent: '<h1>¡Hola {{name}}! Bienvenido a <strong>CREFI</strong></h1><p>Nos alegra mucho que te hayas registrado en nuestro Centro de Fisioterapia. Estamos comprometidos con tu bienestar y salud.</p><p>Si tienes alguna consulta o necesitas ayuda, no dudes en <a href="mailto:crefi@giomr.site" rel="noopener noreferrer" target="_blank">contactarnos</a>. Estamos aquí para apoyarte.</p><p>¡Bienvenido a nuestra familia!</p><p>Atentamente,</p><p>El equipo de tu Centro de Fisioterapia</p>',
            },
            {
                templateName: 'Asignación de Turno',
                subject: 'Tu turno ha sido asignado',
                htmlContent: '<p>Asignación de Turno</p><h1>Hola {{name}}!</h1><p>Te informamos que tu turno ha sido asignado para la fecha: {{date}} a las {{time}}.</p>',
            },
            {
                templateName: 'Cancelación de Turno',
                subject: 'Tu turno ha sido cancelado',
                htmlContent: '<p>Cancelación de Turno</p><h1>Hola {{name}}!</h1><p>Lamentamos informarte que tu turno programado para el {{date}} a las {{time}} ha sido cancelado. Por favor, contáctanos si necesitas más información.</p>',
            },
            {
                templateName: 'Notificación de Turno Próximo',
                subject: '¡Falta una hora para tu turno!',
                htmlContent: '<p>Turno Próximo</p><h1>Hola {{name}}!</h1><p>Te recordamos que falta una hora para tu turno programado el {{date}} a las {{time}}. Por favor, asegúrate de llegar a tiempo.</p>',
            },
        ];
        for (const template of templates) {
            await this.emailTemplatesService.createTemplate(template);
        }
    }
};
exports.MailSeederService = MailSeederService;
exports.MailSeederService = MailSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_template_service_1.MailTemplatesService])
], MailSeederService);
//# sourceMappingURL=mail.seeder.js.map