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
      // Tasks for today
      {
        date: today.toISOString(),
        description: 'Task 1 for today',
        patient: { id: 1 },
        doctor: { id: 2 },
      },
      {
        date: today.toISOString(),
        description: 'Task 2 for today',
        patient: { id: 2 },
        doctor: { id: 3 },
      },
      {
        date: today.toISOString(),
        description: 'Task 3 for today',
        patient: { id: 3 },
        doctor: { id: 1 },
      },
      // Tasks for tomorrow
      {
        date: tomorrow.toISOString(),
        description: 'Task 1 for tomorrow',
        patient: { id: 1 },
        doctor: { id: 2 },
      },
      {
        date: tomorrow.toISOString(),
        description: 'Task 2 for tomorrow',
        patient: { id: 2 },
        doctor: { id: 3 },
      },
      {
        date: tomorrow.toISOString(),
        description: 'Task 3 for tomorrow',
        patient: { id: 3 },
        doctor: { id: 1 },
      },
      // Tasks for 3 days from now
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 1 for 3 days from now',
        patient: { id: 1 },
        doctor: { id: 2 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 2 for 3 days from now',
        patient: { id: 2 },
        doctor: { id: 3 },
      },
      {
        date: threeDaysFromNow.toISOString(),
        description: 'Task 3 for 3 days from now',
        patient: { id: 3 },
        doctor: { id: 1 },
      },
    ];

    for (const appointment of appointments) {
      try {
        const patient = await this.userService.findById(appointment.patientId);
        const doctor = await this.userService.findById(appointment.doctorId);

        if (!patient || !doctor) {
          console.log(
            `Patient with ID ${appointment.patientId} or Doctor with ID ${appointment.doctorId} does not exist.`,
          );
          continue;
        }

        await this.appointmentService.create(appointment);
        console.log(
          `Appointment on ${appointment.date} for Patient ${appointment.patientId} and Doctor ${appointment.doctorId} created successfully.`,
        );
      } catch (error) {
        console.error(
          `Failed to create appointment on ${appointment.date}: ${error.message}`,
        );
      }
    }
  }
}
