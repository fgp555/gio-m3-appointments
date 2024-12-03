import { MailTemplatesService } from './mail-template.service';
export declare class MailTemplatesController {
    private readonly emailTemplatesService;
    constructor(emailTemplatesService: MailTemplatesService);
    createTemplate(data: any): Promise<import("./entities/mail-template.entity").MailTemplate>;
    getTemplates(): Promise<import("./entities/mail-template.entity").MailTemplate[]>;
    getTemplateById(id: number): Promise<import("./entities/mail-template.entity").MailTemplate>;
    updateTemplate(id: number, data: any): Promise<import("./entities/mail-template.entity").MailTemplate>;
    deleteTemplate(id: number): Promise<void>;
}
