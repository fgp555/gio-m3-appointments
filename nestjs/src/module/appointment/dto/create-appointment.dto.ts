// src/appointment/dto/create-appointment.dto.ts
import { IsString, IsDateString, MaxLength, IsInt, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date: string;

  @IsString()
  @MaxLength(255, { message: 'Description should be less than 255 characters' })
  description: string;

  @IsInt({ message: 'User ID must be an integer' })
  @IsOptional() // Make this optional if it might not be set for all cases
  userId: number; // Reference to the user who owns the appointment
}
