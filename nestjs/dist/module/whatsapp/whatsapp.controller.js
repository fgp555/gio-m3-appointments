"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_service_1 = require("./whatsapp.service");
const fs = require("fs");
let WhatsappController = class WhatsappController {
    constructor(whatsappService) {
        this.whatsappService = whatsappService;
    }
    async sendMessage(body) {
        const { phoneNumber, message } = body;
        if (!phoneNumber || !message) {
            return {
                success: false,
                message: 'phoneNumber y message son requeridos',
            };
        }
        return await this.whatsappService.sendMessage(phoneNumber, message);
    }
    async getQR(res) {
        try {
            const qrPath = 'qr-code.png';
            if (fs.existsSync(qrPath)) {
                res.setHeader('Content-Type', 'image/png');
                const stream = fs.createReadStream(qrPath);
                stream.pipe(res);
            }
            else {
                res.status(404).json({ message: 'QR no generado todavía' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el QR' });
        }
    }
    async startWhatsApp(res) {
        this.whatsappService.resetQRGenerationAttempts();
        try {
            await this.whatsappService.restartWhatsApp();
            res
                .status(200)
                .json({ success: true, message: 'WhatsApp iniciado correctamente.' });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ success: false, message: 'Error al iniciar WhatsApp.' });
        }
    }
    async cleanupWhatsApp(res) {
        try {
            this.whatsappService.cleanupService();
            res
                .status(200)
                .json({
                success: true,
                message: 'Servicio de WhatsApp pausado correctamente.',
            });
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({
                success: false,
                message: 'Error al pausar el servicio de WhatsApp.',
            });
        }
    }
};
exports.WhatsappController = WhatsappController;
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('qr'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "getQR", null);
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "startWhatsApp", null);
__decorate([
    (0, common_1.Post)('cleanup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappController.prototype, "cleanupWhatsApp", null);
exports.WhatsappController = WhatsappController = __decorate([
    (0, common_1.Controller)('whatsapp'),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService])
], WhatsappController);
//# sourceMappingURL=whatsapp.controller.js.map