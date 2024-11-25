import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100, { message: 'First name should be less than 100 characters' })
  firstName: string;

  @IsString()
  @MaxLength(100, { message: 'Last name should be less than 100 characters' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsString()
  @MaxLength(255, { message: 'Email should be less than 255 characters' })
  email: string;

  @IsString()
  @MaxLength(100, { message: 'Username should be less than 100 characters' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  @MaxLength(20, { message: 'Password should be less than 20 characters' })
  password: string;

  @IsString()
  @MinLength(6, {
    message: 'Confirm password should be at least 6 characters long',
  })
  @MaxLength(20, {
    message: 'Confirm password should be less than 20 characters',
  })
  confirmPassword: string;

  @IsDateString({}, { message: 'Birthdate must be a valid date format' })
  birthdate: string;

  @Matches(/^\d{8}$/, { message: 'nDni should be exactly 8 digits' })
  nDni: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Image URL should be less than 255 characters' })
  image?: string; // Optional field, defaults to a provided value in the service

  @IsOptional()
  isAdmin?: boolean;
}