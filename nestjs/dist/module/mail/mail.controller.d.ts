import { MailService } from './mail.service';
import { MailDto } from './dtos/mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendEmail(body: MailDto): Promise<{
        message: string;
    }>;
}
