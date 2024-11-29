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

    // Función para generar fechas según los días
    const generateDates = (startDate: Date, days: number) => {
      const dates: Date[] = [];
      for (let i = 0; i < days; i++) {
        const nextDay = new Date(startDate);
        nextDay.setDate(startDate.getDate() + i); // Genera las fechas
        dates.push(nextDay);
      }
      return dates;
    };

    // Lista de descripciones de terapias reales
    const therapyDescriptions = [
      'Sesión de rehabilitación postoperatoria de rodilla',
      'Tratamiento para dolor lumbar crónico con técnicas de terapia manual',
      'Ejercicios de fortalecimiento para esguince de tobillo',
      'Sesión de electroterapia para alivio del dolor en hombro',
      'Estiramientos y masajes para contractura muscular en cuello',
      'Revisión de progreso en tratamiento de fascitis plantar',
      'Terapia de rehabilitación después de fractura de brazo',
      'Ejercicios de movilidad para mejorar rango articular en rodilla',
      'Plan de fortalecimiento muscular para prevención de lesiones',
      'Tratamiento de terapia física para recuperación post-quirúrgica de codo',
    ];

    // Función para generar citas aleatorias entre 2 y 4 por día con descripciones reales de terapias
    const generateRandomAppointments = (
      date: Date,
      patientId: number,
      professionalId: number,
    ) => {
      const appointments = [];
      const numAppointments = Math.floor(Math.random() * 3) + 2; // Aleatoriza entre 2 y 4 citas por día

      const availableHours = Array.from({ length: 9 }, (_, i) => i + 9); // Horas de 9 a 5 (9, 10, ..., 17)
      const selectedHours = [];

      // Selecciona las horas aleatoriamente
      while (selectedHours.length < numAppointments) {
        const randomHour =
          availableHours[Math.floor(Math.random() * availableHours.length)];
        if (!selectedHours.includes(randomHour)) {
          selectedHours.push(randomHour);
        }
      }

      // Crear citas para las horas seleccionadas
      selectedHours.forEach((hour) => {
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hour, 0, 0, 0); // Establece la hora para la cita
        const randomDescription =
          therapyDescriptions[
            Math.floor(Math.random() * therapyDescriptions.length)
          ];
        appointments.push({
          date: appointmentDate.toISOString(),
          description: randomDescription,
          patient: { id: patientId },
          professional: { id: professionalId },
        });
      });

      return appointments;
    };

    // Fechas para hoy y mañana
    const thisWeekDates = generateDates(today, 2); // Incluye hoy y mañana

    // Fechas para el lunes (próximo lunes)
    const mondayNextWeek = new Date(today);
    mondayNextWeek.setDate(today.getDate() + (7 - today.getDay()) + 1); // Lunes de la próxima semana

    // Fechas para la segunda semana (3 días)
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(today.getDate() + (7 - today.getDay()) + 8); // Lunes de la segunda semana
    const nextWeekDates = generateDates(nextWeekStart, 3);

    // Fechas para la tercera semana (2 días)
    const thirdWeekStart = new Date(today);
    thirdWeekStart.setDate(today.getDate() + (7 - today.getDay()) + 15); // Lunes de la tercera semana
    const thirdWeekDates = generateDates(thirdWeekStart, 2);

    // Generar citas para hoy, mañana, el lunes y las semanas siguientes
    const appointments: any[] = [
      ...thisWeekDates.flatMap((date) =>
        generateRandomAppointments(date, 1, 2),
      ), // 2 citas esta semana (hoy y mañana)
      ...[mondayNextWeek].flatMap((date) =>
        generateRandomAppointments(date, 2, 3),
      ), // 2 citas el lunes próximo
      ...nextWeekDates.flatMap((date) =>
        generateRandomAppointments(date, 2, 3),
      ), // 3 citas la próxima semana
      ...thirdWeekDates.flatMap((date) =>
        generateRandomAppointments(date, 3, 1),
      ), // 2 citas tercera semana
    ];

    // console.log(appointments);

    for (const appointment of appointments) {
      try {
        // console.log("appointment",appointment)
        const patient = await this.userService.findById(appointment.patientId);
        const professional = await this.userService.findById(
          appointment.professionalId,
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
