// src/appointment/appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { UserService } from '../user/user.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { log } from 'console';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService, // Injecting UserService to check if a user exists
    private readonly whatsappService: WhatsappService,
  ) {}

  async create(appointmentData: Partial<Appointment>) {
    const { patient, professional } = appointmentData;

    const foundPatient = await this.userService.findByIdforSeeder(patient.id);
    if (!foundPatient) {
      throw new NotFoundException(`Patient with ID ${patient.id} not found`); // Use NotFoundException
    }
    const foundProfessional = await this.userService.findByIdforSeeder(
      professional.id,
    );
    if (!foundProfessional) {
      throw new NotFoundException(
        `professional with ID ${professional.id} not found`,
      ); // Use NotFoundException
    }

    const appointment = this.appointmentRepository.create(appointmentData);
    const result = await this.appointmentRepository.save(appointment);

    const find = await this.appointmentRepository.findOne({
      where: { id: result.id },
      relations: ['patient', 'professional'], // Relaciones a incluir
      select: {
        id: true,
        date: true,
        description: true,
        status: true,
        createdAt: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
          whatsapp: true,
          email: true,
        },
        professional: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          gender: true,
        },
      },
    });

    return find;
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      order: { date: 'ASC', id: 'ASC' },
      relations: ['patient', 'professional'],
      select: {
        id: true,
        date: true,
        description: true,
        status: true,
        createdAt: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
          whatsapp: true,
        },
        professional: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          gender: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'professional'],
    });
    if (!appointment)
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    return appointment;
  }

  async findPendingAppointmentsByProfessionalId(
    professionalId: number,
  ): Promise<Appointment[]> {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    return await this.appointmentRepository.find({
      where: {
        // status: 'PENDING',
        date: MoreThanOrEqual(today),
        professional: { id: professionalId },
      },
      relations: ['patient', 'professional'],
      select: {
        id: true,
        date: true,
        description: true,
        status: true,
        createdAt: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
          whatsapp: true,
        },
        professional: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          gender: true,
        },
      },
      order: { date: 'ASC' },
    });
  }

  async findLast(count: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      order: { createdAt: 'DESC' },
      take: Number(count),
      relations: ['patient', 'professional'], // Incluir relaciones si es necesario
      select: {
        id: true,
        date: true,
        description: true,
        status: true,
        createdAt: true,
        patient: {
          id: true,
          firstName: true,
          lastName: true,
          whatsapp: true,
        },
        professional: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          gender: true,
        },
      },
    });
  }

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

  async cancel(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id);

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // Assuming "status" is a string property in the Appointment entity
    appointment.status = 'CANCELED';

    return await this.appointmentRepository.save(appointment);
  }

  async sendWhatsAppTemplate(resultApptCreate: any) {
    this.whatsappService.whatsappSentApptCreate(resultApptCreate);
  }
}
