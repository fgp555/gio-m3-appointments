import {
  IsString,
  IsDateString,
  MaxLength,
  IsInt,
  IsOptional,
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
}
