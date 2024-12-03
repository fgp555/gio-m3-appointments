import { MailDto } from './dtos/mail.dto';
export declare class MailService {
    private transporter;
    constructor();
    sendMail(body: MailDto): Promise<any>;
}
