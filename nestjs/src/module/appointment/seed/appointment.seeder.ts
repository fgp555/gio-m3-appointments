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

    // Fechas para la próxima semana
    const nextWeekMonday = new Date(today);
    nextWeekMonday.setDate(today.getDate() + (7 - today.getDay())); // lunes de la próxima semana
    const nextWeekTuesday = new Date(nextWeekMonday);
    nextWeekTuesday.setDate(nextWeekMonday.getDate() + 1);
    const nextWeekWednesday = new Date(nextWeekMonday);
    nextWeekWednesday.setDate(nextWeekMonday.getDate() + 2);
    const nextWeekThursday = new Date(nextWeekMonday);
    nextWeekThursday.setDate(nextWeekMonday.getDate() + 3);
    const nextWeekFriday = new Date(nextWeekMonday);
    nextWeekFriday.setDate(nextWeekMonday.getDate() + 4);

    const appointments: any[] = [
      // Tareas para hoy, mañana y dentro de 3 días (como antes)
      {
        date: today.toISOString(),
        description: 'Sesión de rehabilitación postoperatoria de rodilla',
        patient: { id: 1 },
        professional: { id: 8 },
      },
      {
        date: today.toISOString(),
        description:
          'Tratamiento para dolor lumbar crónico con técnicas de terapia manual',
        patient: { id: 2 },
        professional: { id: 9 },
      },
      {
        date: today.toISOString(),
        description: 'Ejercicios de fortalecimiento para esguince de tobillo',
        patient: { id: 3 },
        professional: { id: 10 },
      },
      {
        date: tomorrow.toISOString(),
        description: 'Sesión de electroterapia para alivio del dolor en hombro',
        patient: { id: 4 },
        professional: { id: 8 },
      },
      {
        date: tomorrow.toISOString(),
        description:
          'Estiramientos y masajes para contractura muscular en cuello',
        patient: { id: 5 },
        professional: { id: 9 },
      },
      {
        date: tomorrow.toISOString(),
        description: 'Revisión de progreso en tratamiento de fascitis plantar',
        patient: { id: 6 },
        professional: { id: 10 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Terapia de rehabilitación después de fractura de brazo',
        patient: { id: 7 },
        professional: { id: 8 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description:
          'Ejercicios de movilidad para mejorar rango articular en rodilla',
        patient: { id: 1 },
        professional: { id: 9 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description:
          'Plan de fortalecimiento muscular para prevención de lesiones',
        patient: { id: 2 },
        professional: { id: 10 },
      },

      // Tareas para la próxima semana
      {
        date: nextWeekTuesday.toISOString(),
        description: 'Consulta de control postoperatorio de rodilla',
        patient: { id: 3 },
        professional: { id: 8 },
      },
      {
        date: nextWeekTuesday.toISOString(),
        description: 'Tratamiento de masajes terapéuticos para cuello',
        patient: { id: 4 },
        professional: { id: 9 },
      },
      {
        date: nextWeekThursday.toISOString(),
        description: 'Rehabilitación para esguince de tobillo',
        patient: { id: 5 },
        professional: { id: 10 },
      },
      {
        date: nextWeekThursday.toISOString(),
        description:
          'Evaluación de progreso en tratamiento de fascitis plantar',
        patient: { id: 6 },
        professional: { id: 8 },
      },
      {
        date: nextWeekFriday.toISOString(),
        description:
          'Ejercicios de fortalecimiento para la parte inferior de la espalda',
        patient: { id: 7 },
        professional: { id: 9 },
      },
      {
        date: nextWeekFriday.toISOString(),
        description: 'Terapia de rehabilitación para fractura de brazo',
        patient: { id: 1 },
        professional: { id: 10 },
      },
      {
        date: nextWeekFriday.toISOString(),
        description: 'Consulta de control postoperatorio de rodilla',
        patient: { id: 2 },
        professional: { id: 8 },
      },
      {
        date: nextWeekFriday.toISOString(),
        description: 'Tratamiento de masajes terapéuticos para cuello',
        patient: { id: 3 },
        professional: { id: 9 },
      },
    ];

    for (const appointment of appointments) {
      try {
        const patient = await this.userService.findById(appointment.patient.id);
        const professional = await this.userService.findById(
          appointment.professional.id,
        );

        if (!patient || !professional) {
          console.log(
            `Patient with ID ${appointment.patient.id} or professional with ID ${appointment.professional.id} does not exist.`,
          );
          continue;
        }

        await this.appointmentService.create(appointment);
        console.log(
          `Appointment on ${appointment.date} for Patient ${appointment.patient.id} and professional ${appointment.professional.id} created successfully.`,
        );
      } catch (error) {
        console.error(
          `Failed to create appointment on ${appointment.date}: ${error.message}`,
        );
      }
    }
  }
}
