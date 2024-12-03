import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(body: {
        to: string;
        subject: string;
        text: string;
        html?: string;
    }): Promise<{
        message: string;
    }>;
}
