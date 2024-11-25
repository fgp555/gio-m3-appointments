import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { InfoModule } from './info/info.module';
import { DbModule } from './config/db.module';
import { AuthModule } from './module/auth/auth.module';
import { AppointmentModule } from './module/appointment/appointment.module';

@Module({
  imports: [DbModule, InfoModule, UserModule, AuthModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
