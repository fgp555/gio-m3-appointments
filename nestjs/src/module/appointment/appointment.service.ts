// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService, // Injecting UserService to check if a user exists
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { date, description, userId } = createAppointmentDto;

    // console.log('createAppointmentDto', createAppointmentDto);

    // If userId is provided, check if the user exists
    // if (userId) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }
    // }

    // console.log('user', user);

    // Create a new appointment
    const appointment = this.appointmentRepository.create({
      date: createAppointmentDto.date,
      description: createAppointmentDto.description,
      userId: user, // Use userId directly, not an object
    });

    // Save the appointment in the database
    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: { userId: true },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.findOne(id); // Return the updated appointment
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  async findOneByDateAndDescription(
    date: string,
    description: string,
  ): Promise<Appointment> {
    return this.appointmentRepository.findOne({
      where: { date, description },
    });
  }
}
