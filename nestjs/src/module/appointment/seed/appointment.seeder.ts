import { Injectable } from '@nestjs/common';
import { AppointmentService } from '../appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UserService } from 'src/module/user/user.service'; // Assuming UserService exists for fetching users

@Injectable()
export class AppointmentSeederService {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService, // Injecting UserService to find users
  ) {
    this.seed();
  }

  async seed() {
    // Example appointments data
    const appointments: CreateAppointmentDto[] = [
      {
        date: '2024-11-25T10:00:00.000Z',
        description: 'Meeting with Team A',
        userId: 1, // User ID 1 (Ensure this user exists in the database)
      },
      {
        date: '2024-11-26T11:00:00.000Z',
        description: 'Client presentation',
        userId: 2, // User ID 2 (Ensure this user exists in the database)
      },
      {
        date: '2024-11-27T09:00:00.000Z',
        description: 'Team building event',
        userId: 1, // User ID 1 (Ensure this user exists in the database)
      },
    ];

    // Insert appointments into the database
    for (const appointment of appointments) {
      try {
        // Find the user by ID to ensure user exists
        const user = await this.userService.findById(appointment.userId);
        if (!user) {
          console.log(`User with ID ${appointment.userId} does not exist.`);
          continue; // Skip this appointment if the user doesn't exist
        }

        // // Verify if an appointment with the same date and description already exists
        // const existingAppointment =
        //   await this.appointmentService.findOneByDateAndDescription(
        //     appointment.date,
        //     appointment.description,
        //   );
        // if (existingAppointment) {
        //   console.log(
        //     `Appointment with date ${appointment.date} and description "${appointment.description}" already exists.`,
        //   );
        //   continue; // Skip creating this appointment if it already exists
        // }

        // Create the appointment, setting the userId correctly
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
