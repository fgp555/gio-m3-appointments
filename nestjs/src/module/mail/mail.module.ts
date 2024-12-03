import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailTemplatesService } from './mail-template.service';
import { MailTemplatesController } from './mail-template.controller';
import { MailTemplate } from './entities/mail-template.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MailTemplate])],
  controllers: [MailController, MailTemplatesController],
  providers: [MailService, MailTemplatesService],
})
export class MailModule {}
