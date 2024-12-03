import { OnModuleInit } from '@nestjs/common';
import { MailTemplatesService } from '../mail-template.service';
export declare class MailSeederService implements OnModuleInit {
    private readonly emailTemplatesService;
    constructor(emailTemplatesService: MailTemplatesService);
    onModuleInit(): Promise<void>;
    private seed;
}
