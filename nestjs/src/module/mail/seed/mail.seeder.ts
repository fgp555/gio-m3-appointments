import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailTemplatesService } from '../mail-template.service';

@Injectable()
export class MailSeederService implements OnModuleInit {
  constructor(private readonly emailTemplatesService: MailTemplatesService) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed(): Promise<void> {
    console.log('Running mail seeder...');

    const templates = [
      {
        templateName: 'Registro de Usuario',
        subject: '¡Bienvenido a nuestro Centro de Fisioterapia!',
        text: '¡Bienvenido a nuestro Centro de Fisioterapia!',
        htmlContent:
          '<h1>¡Hola {{name}}! Bienvenido a <strong>CREFI</strong></h1><p>Nos alegra mucho que te hayas registrado en nuestro Centro de Fisioterapia. Estamos comprometidos con tu bienestar y salud.</p><p>Si tienes alguna consulta o necesitas ayuda, no dudes en <a href="mailto:crefi@giomr.site" rel="noopener noreferrer" target="_blank">contactarnos</a>. Estamos aquí para apoyarte.</p><p>¡Bienvenido a nuestra familia!</p><p>Atentamente,</p><p>El equipo de tu Centro de Fisioterapia</p>',
      },
      {
        templateName: 'Asignación de Turno',
        subject: 'Tu turno ha sido asignado',
        htmlContent:
          '<p>Asignación de Turno</p><h1>Hola {{name}}!</h1><p>Te informamos que tu turno ha sido asignado para la fecha: {{date}} a las {{time}}.</p>',
      },
      // {
      //   templateName: 'Confirmación de Turno',
      //   subject: 'Confirma tu turno',
      //   htmlContent:
      //     '<p>Confirmación de Turno</p><h1>Hola {{name}}!</h1><p>Por favor confirma tu asistencia al turno programado para el {{date}} a las {{time}}.</p>',
      // },
      {
        templateName: 'Cancelación de Turno',
        subject: 'Tu turno ha sido cancelado',
        htmlContent:
          '<p>Cancelación de Turno</p><h1>Hola {{name}}!</h1><p>Lamentamos informarte que tu turno programado para el {{date}} a las {{time}} ha sido cancelado. Por favor, contáctanos si necesitas más información.</p>',
      },
      {
        templateName: 'Notificación de Turno Próximo',
        subject: '¡Falta una hora para tu turno!',
        htmlContent:
          '<p>Turno Próximo</p><h1>Hola {{name}}!</h1><p>Te recordamos que falta una hora para tu turno programado el {{date}} a las {{time}}. Por favor, asegúrate de llegar a tiempo.</p>',
      },
    ];

    for (const template of templates) {
      await this.emailTemplatesService.createTemplate(template);
    }
  }
}
