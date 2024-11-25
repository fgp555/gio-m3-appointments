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

    const appointments: CreateAppointmentDto[] = [
      // Tareas para hoy
      {
        date: today.toISOString(),
        description: 'Task 1 for today',
        userId: 1,
      },
      {
        date: today.toISOString(),
        description: 'Task 2 for today',
        userId: 2,
      },
      {
        date: today.toISOString(),
        description: 'Task 3 for today',
        userId: 3,
      },
      // Tareas para mañana
      {
        date: tomorrow.toISOString(),
        description: 'Task 1 for tomorrow',
        userId: 1,
      },
      {
        date: tomorrow.toISOString(),
        description: 'Task 2 for tomorrow',
        userId: 2,
      },
      {
        date: tomorrow.toISOString(),
        description: 'Task 3 for tomorrow',
        userId: 3,
      },
      // Tareas para dentro de 3 días
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 1 for 3 days from now',
        userId: 1,
      },
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 2 for 3 days from now',
        userId: 2,
      },
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 3 for 3 days from now',
        userId: 3,
      },
    ];

    for (const appointment of appointments) {
      try {
        const user = await this.userService.findById(appointment.userId);
        if (!user) {
          console.log(`User with ID ${appointment.userId} does not exist.`);
          continue;
        }

        await this.appointmentService.create(appointment);
        console.log(`Appointment on ${appointment.date} created successfully.`);
      } catch (error) {
        console.error(
          `Failed to create appointment on ${appointment.date}: ${error.message}`,
        );
      }
    }
  }
}
