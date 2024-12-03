import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailTemplate } from './entities/mail-template.entity';

@Injectable()
export class MailTemplatesService {
  constructor(
    @InjectRepository(MailTemplate)
    private readonly emailTemplateRepository: Repository<MailTemplate>,
  ) {}

  async createTemplate(data: Partial<MailTemplate>): Promise<MailTemplate> {
    const template = this.emailTemplateRepository.create(data);
    return await this.emailTemplateRepository.save(template);
  }

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
