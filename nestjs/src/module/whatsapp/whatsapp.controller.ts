import { Controller, Post, Body, Res, Get, Delete } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  async sendMessage(@Body() body: { phoneNumber: string; message: string }) {
    const { phoneNumber, message } = body;

    if (!phoneNumber || !message) {
      return {
        success: false,
        message: 'phoneNumber y message son requeridos',
      };
    }

    return await this.whatsappService.sendMessage(phoneNumber, message);
  }

  @Get('qr')
  async getQR(@Res() res: Response) {
    try {
      const qrPath = 'qr-code.png';
      if (fs.existsSync(qrPath)) {
        res.setHeader('Content-Type', 'image/png');
        const stream = fs.createReadStream(qrPath);
        stream.pipe(res);
      } else {
        res.status(404).json({ message: 'QR no generado todavía' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el QR' });
    }
  }

  @Post('start')
  async startWhatsApp(@Res() res: Response) {
    // Reiniciar el contador de generación de QR antes de intentar generar uno nuevo
    this.whatsappService.resetQRGenerationAttempts();

    try {
      // Reiniciamos el servicio y comenzamos una nueva conexión
      await this.whatsappService.restartWhatsApp();
      res
        .status(200)
        .json({ success: true, message: 'WhatsApp iniciado correctamente.' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: 'Error al iniciar WhatsApp.' });
    }
  }

  @Post('cleanup')
  async cleanupWhatsApp(@Res() res: Response) {
    try {
      // Pausar el servicio
      this.whatsappService.cleanupService();
      res
        .status(200)
        .json({
          success: true,
          message: 'Servicio de WhatsApp pausado correctamente.',
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          success: false,
          message: 'Error al pausar el servicio de WhatsApp.',
        });
    }
  }
}
