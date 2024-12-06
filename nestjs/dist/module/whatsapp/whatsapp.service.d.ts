import { OnModuleInit } from '@nestjs/common';
export declare class WhatsappService implements OnModuleInit {
    private socket;
    private qrGenerationAttempts;
    private isPaused;
    onModuleInit(): Promise<void>;
    initWhatsApp(): Promise<void>;
    resetQRGenerationAttempts(): void;
    restartWhatsApp(): Promise<void>;
    cleanupService(): void;
    sendMessage(phoneNumber: string, message: string): Promise<{
        success: boolean;
        message: string;
    }>;
    whatsappSentApptCreate(resultApptCreate: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
