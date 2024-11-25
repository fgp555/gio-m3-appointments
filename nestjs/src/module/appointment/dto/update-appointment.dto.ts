// src/appointment/dto/update-appointment.dto.ts
import { IsOptional, IsString, IsDateString, MaxLength } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Description should be less than 255 characters' })
  description?: string;
}
