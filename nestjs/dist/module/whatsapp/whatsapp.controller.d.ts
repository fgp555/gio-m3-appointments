import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';
export declare class WhatsappController {
    private readonly whatsappService;
    constructor(whatsappService: WhatsappService);
    sendMessage(body: {
        phoneNumber: string;
        message: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getQR(res: Response): Promise<void>;
    startWhatsApp(res: Response): Promise<void>;
    cleanupWhatsApp(res: Response): Promise<void>;
}
