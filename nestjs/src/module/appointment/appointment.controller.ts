// src/appointment/appointment.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { MailTemplatesService } from '../mail/mail-template.service';
import { log } from 'console';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly emailTemplatesService: MailTemplatesService, // Inyecta el servicio de plantillas
  ) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const resultApptCreate =
      await this.appointmentService.create(createAppointmentDto);

    if (resultApptCreate.patient.email) {
      console.log(
        'resultApptCreate.patient.email',
        resultApptCreate.patient.email,
      );
      await this.emailTemplatesService.createAppointmentTemplate(
        resultApptCreate,
      );
    }
    console.log('resultApptCreate', resultApptCreate);

    return resultApptCreate;
  }

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get('pending-by-professional/:professionalId')
  findPendingAppointmentsByProfessional(
    @Param('professionalId', ParseIntPipe) professionalId: number,
  ): Promise<Appointment[]> {
    return this.appointmentService.findPendingAppointmentsByProfessionalId(
      professionalId,
    );
  }

  @Get('last/:count')
  findLast(@Param('count') count: string): Promise<Appointment[]> {
    return this.appointmentService.findLast(count);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.appointmentService.delete(id);
  }

  @Patch('cancel/:id')
  cancel(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentService.cancel(id);
  }
}
