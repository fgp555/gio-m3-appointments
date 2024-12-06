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
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly emailTemplatesService: MailTemplatesService, // Inyecta el servicio de plantillas
    private readonly whatsappService: WhatsappService,
  ) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const resultApptCreate = await this.appointmentService.create(createAppointmentDto);

    // if (result.patient.email) {
    //   console.log('result.patient.email', result.patient.email);
    //   await this.emailTemplatesService.createAppointmentTemplate(result);
    // }
    // console.log('result', result);

    if (resultApptCreate.patient.whatsapp) {
      console.log('result.patient.whatsapp', resultApptCreate.patient.whatsapp);
      await this.appointmentService.sendWhatsAppTemplate(resultApptCreate);
      // await this.whatsappService.tempWhatsapp();
    }

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

  @Post('whatsapp')
  async tempApptWhatsapp() {
    await this.appointmentService.sendWhatsAppTemplate({});
    return 'tempApptWhatsapp';
  }
}
