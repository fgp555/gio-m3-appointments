import { Injectable, OnModuleInit } from '@nestjs/common';
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import * as qr from 'qr-image';
import * as fs from 'fs';
import Pino from 'pino';

const logger = Pino({
  level: 'info',
  transport: {
    target: 'pino-pretty', // Opcional, para logs formateados
    options: {
      colorize: true, // Colorea los logs en la consola
    },
  },
}) as any; // Cast para evitar conflictos de tipos

@Injectable()
export class WhatsappService implements OnModuleInit {
  private socket: any;
  private qrGenerationAttempts: number = 0; // Contador para los intentos de generar QR
  private isPaused: boolean = false; // Variable para saber si el servicio está pausado

  async onModuleInit() {
    await this.initWhatsApp();
  }

  // Inicializa la conexión con WhatsApp
  async initWhatsApp() {
    if (this.isPaused) {
      console.log('El servicio está pausado. No se puede iniciar WhatsApp.');
      return; // No iniciamos WhatsApp si está pausado
    }

    const { state, saveCreds } = await useMultiFileAuthState('./sessions');
    this.socket = makeWASocket({
      auth: state,
      logger,
      syncFullHistory: false,
    });

    this.socket.ev.on('connection.update', async (update) => {
      const { connection, qr: qrCode, lastDisconnect } = update;

      if (connection === 'close') {
        const reason = (lastDisconnect?.error as any)?.output?.statusCode;
        console.error('Desconexión detectada. Razón:', reason);

        if (reason === DisconnectReason.loggedOut) {
          console.log(
            'Sesión cerrada desde el dispositivo. Reconexión desactivada.',
          );
        } else {
          console.log('Reconexión automática deshabilitada.');
        }
      }

      if (connection === 'open') {
        console.log('¡Conexión exitosa a WhatsApp!');
      }

      // Solo genera un QR si no se ha alcanzado el límite
      if (qrCode && this.qrGenerationAttempts < 3) {
        this.qrGenerationAttempts++;
        console.log(`Generando QR. Intento ${this.qrGenerationAttempts}/5...`);
        const qrAsAscii = qr.imageSync(qrCode, { type: 'png' });
        fs.writeFileSync('qr-code.png', qrAsAscii);
        console.log('QR generado como qr-code.png');
      }

      // Si ya se han generado 5 QR, se pausa el servicio
      if (this.qrGenerationAttempts >= 5) {
        console.log(
          'Límite de generación de QR alcanzado. El servicio se pausará.',
        );
        this.isPaused = true;
        // this.socket.close(); // Detener la conexión de WhatsApp
        this.socket.end();
        console.log('Servicio de WhatsApp pausado.');
      }
    });

    // Guardar credenciales actualizadas
    this.socket.ev.on('creds.update', saveCreds);
  }

  // Función para resetear el contador de generación de QR
  resetQRGenerationAttempts() {
    this.qrGenerationAttempts = 0; // Reinicia el contador
    this.isPaused = false; // Reactiva el servicio
    console.log('Contador de generación de QR reiniciado.');
  }

  // Reinicia el servicio, reseteando el contador y reactivando la conexión
  async restartWhatsApp() {
    this.resetQRGenerationAttempts(); // Resetea el contador y reactiva el servicio
    console.log('Reiniciando servicio de WhatsApp...');
    await this.initWhatsApp();
  }

  // Función para pausar el servicio de WhatsApp
  cleanupService() {
    if (this.socket) {
      console.log('Pausing WhatsApp service...');
      this.isPaused = true; // Pausa el servicio
      this.socket.end(); // Cierra la conexión
    }
  }

  // Envía un mensaje de WhatsApp
  async sendMessage(phoneNumber: string, message: string) {
    if (!this.socket) throw new Error('WhatsApp no está conectado');

    const formattedNumber = `${phoneNumber}@s.whatsapp.net`; // Formatea el número
    await this.socket.sendMessage(formattedNumber, { text: message });
    return { success: true, message: 'Mensaje enviado con éxito' };
  }

  async whatsappSentApptCreate(resultApptCreate: any) {
    if (
      !resultApptCreate ||
      !resultApptCreate.date ||
      !resultApptCreate.professionalName
    ) {
      throw new Error('Faltan datos para crear el mensaje');
    }

    // Formatea la fecha de la cita en un formato legible
    const appointmentDate = new Date(resultApptCreate.date);
    const formattedDate = appointmentDate.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    // Crear el mensaje a enviar
    const message = `
      Tu turno ha sido programado exitosamente en el Centro de Fisioterapia:
      
      🗓 Fecha y hora: ${formattedDate}
      👩‍⚕️ Profesional: ${resultApptCreate.professionalName}
      📝 Motivo: ${resultApptCreate.description || 'No especificado'}
      📄 Estado: ${resultApptCreate.status || 'Pendiente'}
      
      Si tienes preguntas o necesitas reprogramar, por favor contáctanos.
      
      Gracias por confiar en nosotros.
    `;

    // Llama a la función para enviar el mensaje, pasando el número de teléfono del paciente
    try {
      const phoneNumber = resultApptCreate.patientPhoneNumber; // Asegúrate de que este dato esté en el objeto
      await this.sendMessage(phoneNumber, message);
      return { success: true, message: 'Mensaje de cita enviado con éxito' };
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      return {
        success: false,
        message: 'Hubo un error al enviar el mensaje de cita',
      };
    }
  }
}
