// back\src\module\user\seed\user.seeder.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // Crear usuarios de ejemplo
    const users: any[] = [
      {
        firstName: 'Luis Admin',
        lastName: 'Lopez',
        email: 'luisadmin@gmail.com',
        whatsapp: '123456789',
        username: 'luis_admin',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'admin',
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@gmail.com',
        whatsapp: '123456789',
        username: 'maria_garcia',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '12345678',
        role: 'patient',
      },
      {
        firstName: 'Pedro',
        lastName: 'Perez',
        email: 'pedro@gmail.com',
        whatsapp: '123456789',
        username: 'pedro_perez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'patient',
      },
      {
        firstName: 'Luis',
        lastName: 'Gonzalez',
        email: 'luis@gmail.com',
        whatsapp: '123456789',
        username: 'luis_gonzalez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'patient',
      },
      {
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carlos@gmail.com',
        whatsapp: '123456789',
        username: 'carlos_gonzalez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'doctor',
      },
      {
        firstName: 'Sofia',
        lastName: 'Gonzalez',
        email: 'sofia@gmail.com',
        whatsapp: '123456789',
        username: 'sofia_gonzalez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'doctor',
      },
      {
        firstName: 'Ana',
        lastName: 'Gomez',
        email: 'ana@gmail.com',
        whatsapp: '123456789',
        username: 'ana_gomez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
        role: 'doctor',
      },
    ];

    // Insertar los usuarios en la base de datos
    for (const user of users) {
      try {
        // Verificar si el usuario con el email ya existe
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) {
          console.log(`User with email ${user.email} already exists.`);
          continue; // Salta la creación de este usuario
        }

        await this.userService.create(user);
        console.log(`User ${user.firstName} created successfully.`);
      } catch (error) {
        console.error(
          `Failed to create user ${user.firstName}: ${error.message}`,
        );
      }
    }
  }
}
