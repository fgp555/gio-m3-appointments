import { Injectable } from '@nestjs/common';
import { AppointmentService } from '../appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class AppointmentSeederService {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService,
  ) {}

  async seed() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    const appointments: any[] = [
      // Tareas para hoy
      {
        date: today.toISOString(),
        description: 'Sesión de rehabilitación postoperatoria de rodilla',
        patient: { id: 1 },
        professional: { id: 2 },
      },
      {
        date: today.toISOString(),
        description:
          'Tratamiento para dolor lumbar crónico con técnicas de terapia manual',
        patient: { id: 2 },
        professional: { id: 3 },
      },
      {
        date: today.toISOString(),
        description: 'Ejercicios de fortalecimiento para esguince de tobillo',
        patient: { id: 3 },
        professional: { id: 1 },
      },
      // Tareas para mañana
      {
        date: tomorrow.toISOString(),
        description: 'Sesión de electroterapia para alivio del dolor en hombro',
        patient: { id: 1 },
        professional: { id: 2 },
      },
      {
        date: tomorrow.toISOString(),
        description:
          'Estiramientos y masajes para contractura muscular en cuello',
        patient: { id: 2 },
        professional: { id: 3 },
      },
      {
        date: tomorrow.toISOString(),
        description: 'Revisión de progreso en tratamiento de fascitis plantar',
        patient: { id: 3 },
        professional: { id: 1 },
      },
      // Tareas para dentro de 3 días
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Terapia de rehabilitación después de fractura de brazo',
        patient: { id: 1 },
        professional: { id: 2 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description:
          'Ejercicios de movilidad para mejorar rango articular en rodilla',
        patient: { id: 2 },
        professional: { id: 3 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description:
          'Plan de fortalecimiento muscular para prevención de lesiones',
        patient: { id: 3 },
        professional: { id: 1 },
      },
    ];

    for (const appointment of appointments) {
      try {
        const patient = await this.userService.findById(appointment.patientId);
        const professional = await this.userService.findById(appointment.professionalId);

        if (!patient || !professional) {
          console.log(
            `Patient with ID ${appointment.patientId} or professional with ID ${appointment.professionalId} does not exist.`,
          );
          continue;
        }

        await this.appointmentService.create(appointment);
        console.log(
          `Appointment on ${appointment.date} for Patient ${appointment.patientId} and professional ${appointment.professionalId} created successfully.`,
        );
      } catch (error) {
        console.error(
          `Failed to create appointment on ${appointment.date}: ${error.message}`,
        );
      }
    }
  }
}
