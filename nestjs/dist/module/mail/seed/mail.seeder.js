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
                templateName: 'Cita Programada',
                subject: 'Tu turno ha sido programado exitosamente',
                htmlContent: '<p>Hola {{name}},</p><p>Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:</p><ul><li>🗓 <strong>Fecha y hora:</strong> {{formattedDate}}</li><li>👩‍⚕️ <strong>Profesional:</strong> {{professionalName}}</li><li>📝 <strong>Motivo:</strong> {{description}}</li><li>📄 <strong>Estado:</strong> {{status}}</li></ul><p>Si tienes preguntas o necesitas reprogramar, por favor contáctanos.</p><p>Gracias por confiar en nosotros.</p><p><strong>Centro de Fisioterapia CREFI</strong></p><p>Correo: crefi@giomr.site</p>',
                text: `Hola {{name}},
      
      Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:
      
      🗓 Fecha y hora: {{formattedDate}}
      👩‍⚕️ Profesional: {{professionalName}}
      📝 Motivo: {{description}}
      📄 Estado: {{status}}
      
      Si tienes preguntas o necesitas reprogramar, por favor contáctanos.
      
      Gracias por confiar en nosotros.
      
      Centro de Fisioterapia [Nombre del Centro]
      Teléfono: [Número de teléfono]
      Correo: [Correo electrónico]`,
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