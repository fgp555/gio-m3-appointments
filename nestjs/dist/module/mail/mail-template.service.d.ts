import { Repository } from 'typeorm';
import { MailTemplate } from './entities/mail-template.entity';
export declare class MailTemplatesService {
    private readonly emailTemplateRepository;
    constructor(emailTemplateRepository: Repository<MailTemplate>);
    createTemplate(data: Partial<MailTemplate>): Promise<MailTemplate>;
    getTemplates(): Promise<MailTemplate[]>;
    getTemplateById(id: number): Promise<MailTemplate>;
    updateTemplate(id: number, data: Partial<MailTemplate>): Promise<MailTemplate>;
    deleteTemplate(id: number): Promise<void>;
}
