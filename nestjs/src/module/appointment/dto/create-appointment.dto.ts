import {
  IsString,
  IsDateString,
  MaxLength,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString({}, { message: 'Date must be a valid date string' })
  date: string;

  @IsString()
  @MaxLength(255, { message: 'Description should be less than 255 characters' })
  description: string;

  @IsInt({ message: 'Patient ID must be an integer' })
  @IsOptional()
  patientId?: number; // Reference to the patient owning the appointment

  @IsInt({ message: 'Doctor ID must be an integer' })
  @IsOptional()
  doctorId?: number; // Reference to the doctor associated with the appointment

  @IsEnum(
    [
      'PENDING',
      'CONFIRMED',
      'CANCELED',
      'RESCHEDULED',
      'IN_PROGRESS',
      'COMPLETED',
      'NO_SHOW',
    ],
    { message: 'Status must be one of the allowed values' },
  )
  @IsOptional()
  status?:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'RESCHEDULED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'NO_SHOW'; // Appointment status
}
