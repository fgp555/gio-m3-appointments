"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const baileys_1 = require("@whiskeysockets/baileys");
const qr = require("qr-image");
const fs = require("fs");
const pino_1 = require("pino");
const logger = (0, pino_1.default)({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
});
let WhatsappService = class WhatsappService {
    constructor() {
        this.qrGenerationAttempts = 0;
        this.isPaused = false;
    }
    async onModuleInit() {
        await this.initWhatsApp();
    }
    async initWhatsApp() {
        if (this.isPaused) {
            console.log('El servicio está pausado. No se puede iniciar WhatsApp.');
            return;
        }
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)('./sessions');
        this.socket = (0, baileys_1.default)({
            auth: state,
            logger,
            syncFullHistory: false,
        });
        this.socket.ev.on('connection.update', async (update) => {
            const { connection, qr: qrCode, lastDisconnect } = update;
            if (connection === 'close') {
                const reason = lastDisconnect?.error?.output?.statusCode;
                console.error('Desconexión detectada. Razón:', reason);
                if (reason === baileys_1.DisconnectReason.loggedOut) {
                    console.log('Sesión cerrada desde el dispositivo. Reconexión desactivada.');
                }
                else {
                    console.log('Reconexión automática deshabilitada.');
                }
            }
            if (connection === 'open') {
                console.log('¡Conexión exitosa a WhatsApp!');
            }
            if (qrCode && this.qrGenerationAttempts < 3) {
                this.qrGenerationAttempts++;
                console.log(`Generando QR. Intento ${this.qrGenerationAttempts}/5...`);
                const qrAsAscii = qr.imageSync(qrCode, { type: 'png' });
                fs.writeFileSync('qr-code.png', qrAsAscii);
                console.log('QR generado como qr-code.png');
            }
            if (this.qrGenerationAttempts >= 5) {
                console.log('Límite de generación de QR alcanzado. El servicio se pausará.');
                this.isPaused = true;
                this.socket.end();
                console.log('Servicio de WhatsApp pausado.');
            }
        });
        this.socket.ev.on('creds.update', saveCreds);
    }
    resetQRGenerationAttempts() {
        this.qrGenerationAttempts = 0;
        this.isPaused = false;
        console.log('Contador de generación de QR reiniciado.');
    }
    async restartWhatsApp() {
        this.resetQRGenerationAttempts();
        console.log('Reiniciando servicio de WhatsApp...');
        await this.initWhatsApp();
    }
    cleanupService() {
        if (this.socket) {
            console.log('Pausing WhatsApp service...');
            this.isPaused = true;
            this.socket.end();
        }
    }
    async sendMessage(phoneNumber, message) {
        if (!this.socket)
            throw new Error('WhatsApp no está conectado');
        const formattedNumber = `${phoneNumber}@s.whatsapp.net`;
        await this.socket.sendMessage(formattedNumber, { text: message });
        return { success: true, message: 'Mensaje enviado con éxito' };
    }
    async whatsappSentApptCreate(resultApptCreate) {
        if (!resultApptCreate ||
            !resultApptCreate.date ||
            !resultApptCreate.professionalName) {
            throw new Error('Faltan datos para crear el mensaje');
        }
        const appointmentDate = new Date(resultApptCreate.date);
        const formattedDate = appointmentDate.toLocaleString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        const message = `
      Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:
      
      🗓 Fecha y hora: ${formattedDate}
      👩‍⚕️ Profesional: ${resultApptCreate.professionalName}
      📝 Motivo: ${resultApptCreate.description || 'No especificado'}
      📄 Estado: ${resultApptCreate.status || 'Pendiente'}
      
      Si tienes preguntas o necesitas reprogramar, por favor contáctanos.
      
      Gracias por confiar en nosotros.
    `;
        try {
            const phoneNumber = resultApptCreate.patientPhoneNumber;
            await this.sendMessage(phoneNumber, message);
            return { success: true, message: 'Mensaje de cita enviado con éxito' };
        }
        catch (error) {
            console.error('Error al enviar mensaje:', error);
            return {
                success: false,
                message: 'Hubo un error al enviar el mensaje de cita',
            };
        }
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)()
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map