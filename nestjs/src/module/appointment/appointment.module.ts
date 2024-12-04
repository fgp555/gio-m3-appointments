// src/appointment/appointment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { AppointmentSeederService } from './seed/appointment.seeder';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { MailTemplatesService } from '../mail/mail-template.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, UserEntity]),
    MailModule,
    //
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    AppointmentSeederService,
    UserService,
    // MailTemplatesService,
  ],
  exports: [AppointmentSeederService],
})
export class AppointmentModule {}
