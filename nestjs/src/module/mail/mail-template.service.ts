import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailTemplate } from './entities/mail-template.entity';
import { MailService } from './mail.service';

@Injectable()
export class MailTemplatesService {
  constructor(
    @InjectRepository(MailTemplate)
    private readonly emailTemplateRepository: Repository<MailTemplate>,

    private readonly mailService: MailService,
  ) {}

  async createTemplate(data: Partial<MailTemplate>): Promise<MailTemplate> {
    const template = this.emailTemplateRepository.create(data);
    return await this.emailTemplateRepository.save(template);
  }

  // ========== sentMailTemplate ==========
  async sentMailRegister(body: any) {
    // Obtener la plantilla de correo
    const templateMail = await this.getTemplateById(1); // ID de la plantilla
    if (!templateMail) {
      throw new NotFoundException('Plantilla no encontrada');
    }

    // Reemplazar placeholders con los datos dinámicos
    const placeholders = { name: body.firstName };

    const personalizedHtml = this.replacePlaceholders(
      templateMail.htmlContent,
      placeholders,
    );

    // Crear cuerpo del correo
    const emailBody = {
      to: body.email,
      subject: templateMail.subject,
      text: body.text || 'Este es el contenido del correo en texto plano',
      html: personalizedHtml,
    };

    // Enviar correo
    try {
      const result = await this.mailService.sendMail(emailBody); // Asegúrate de descomentar cuando esté listo
      console.info('Email sent successfully:', result);
      return { message: 'Correo enviado exitosamente', result };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }

  // Función para reemplazar los placeholders en la plantilla
  private replacePlaceholders(
    template: string,
    variables: Record<string, string>,
  ): string {
    return template.replace(
      /{{(\w+)}}/g,
      (_, key) => variables[key] || `{{${key}}}`,
    );
  }

  // ========== sentMailTemplate ==========

  async getTemplates(): Promise<MailTemplate[]> {
    return await this.emailTemplateRepository.find();
  }

  async getTemplateById(id: number): Promise<MailTemplate> {
    return await this.emailTemplateRepository.findOne({ where: { id } });
  }

  async updateTemplate(
    id: number,
    data: Partial<MailTemplate>,
  ): Promise<MailTemplate> {
    await this.emailTemplateRepository.update(id, data);
    return await this.getTemplateById(id);
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.emailTemplateRepository.delete(id);
  }
}
