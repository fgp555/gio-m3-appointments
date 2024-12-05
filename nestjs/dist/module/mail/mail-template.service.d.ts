import { Repository } from 'typeorm';
import { MailTemplate } from './entities/mail-template.entity';
import { MailService } from './mail.service';
export declare class MailTemplatesService {
    private readonly emailTemplateRepository;
    private readonly mailService;
    constructor(emailTemplateRepository: Repository<MailTemplate>, mailService: MailService);
    createTemplate(data: Partial<MailTemplate>): Promise<MailTemplate>;
    sentMailRegister(body: any): Promise<{
        message: string;
        result: any;
    }>;
    private replacePlaceholders;
    createAppointmentTemplate(data: any): Promise<{
        message: string;
        result: any;
    }>;
    getTemplates(): Promise<MailTemplate[]>;
    getTemplateById(id: number): Promise<MailTemplate>;
    updateTemplate(id: number, data: Partial<MailTemplate>): Promise<MailTemplate>;
    deleteTemplate(id: number): Promise<void>;
}
