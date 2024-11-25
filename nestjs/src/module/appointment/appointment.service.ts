// src/appointment/appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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

  // async create(
  //   createAppointmentDto: CreateAppointmentDto,
  // ): Promise<Appointment> {
  //   const { date, description, userId } = createAppointmentDto;

  //   // console.log('createAppointmentDto', createAppointmentDto);

  //   // If userId is provided, check if the user exists
  //   // if (userId) {
  //   const user = await this.userService.findById(userId);
  //   if (!user) {
  //     throw new Error(`User with ID ${userId} does not exist.`);
  //   }
  //   // }

  //   // console.log('user', user);

  //   // Create a new appointment
  //   const appointment = this.appointmentRepository.create({
  //     date: createAppointmentDto.date,
  //     description: createAppointmentDto.description,
  //     userId: user, // Use userId directly, not an object
  //   });

  //   // Save the appointment in the database
  //   return this.appointmentRepository.save(appointment);
  // }

  async create(appointmentData: Partial<Appointment>) {
    const { patient, doctor } = appointmentData;

    const foundPatient = await this.userService.findById(patient.id);
    if (!foundPatient) {
      throw new NotFoundException(`Patient with ID ${patient.id} not found`); // Use NotFoundException
    }
    const foundDoctor = await this.userService.findById(doctor.id);
    if (!foundDoctor) {
      throw new NotFoundException(`Doctor with ID ${doctor.id} not found`); // Use NotFoundException
    }

    const appointment = this.appointmentRepository.create(appointmentData);
    return await this.appointmentRepository.save(appointment);
  }

  // async findAll(): Promise<Appointment[]> {
  //   return this.appointmentRepository.find({
  //     relations: { userId: true },
  //   });
  // }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['patient', 'doctor'],
      select: {
        id: true,
        date: true,
        description: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
        },
        doctor: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    });
  }

  // async findOne(id: number): Promise<Appointment> {
  //   return this.appointmentRepository.findOne({ where: { id } });
  // }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
    if (!appointment)
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    return appointment;
  }

  // async update(
  //   id: number,
  //   updateAppointmentDto: UpdateAppointmentDto,
  // ): Promise<Appointment> {
  //   await this.appointmentRepository.update(id, updateAppointmentDto);
  //   return this.findOne(id); // Return the updated appointment
  // }

  // async remove(id: number): Promise<void> {
  //   await this.appointmentRepository.delete(id);
  // }

  async update(
    id: number,
    appointmentData: Partial<Appointment>,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, appointmentData);
    return await this.appointmentRepository.save(appointment);
  }

  async delete(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
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
