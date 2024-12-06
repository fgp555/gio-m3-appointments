import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { InfoModule } from './info/info.module';
import { DbModule } from './config/db.module';
import { AuthModule } from './module/auth/auth.module';
import { AppointmentModule } from './module/appointment/appointment.module';
import { UserSeederService } from './module/user/seed/user.seeder';
import { AppointmentSeederService } from './module/appointment/seed/appointment.seeder';
import { BackupDBModule } from './tools/backup-db/backup-db.module';
import { MailModule } from './module/mail/mail.module';

@Module({
  imports: [
    DbModule,
    InfoModule,
    UserModule,
    AuthModule,
    AppointmentModule,
    BackupDBModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly appointmentSeederService: AppointmentSeederService,
  ) {
    this.seed();
  }

  private async seed() {
    await this.userSeederService.seed();
    await this.appointmentSeederService.seed();
  }
}
