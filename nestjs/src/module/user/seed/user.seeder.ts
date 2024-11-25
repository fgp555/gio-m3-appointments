// back\src\module\user\seed\user.seeder.ts

import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seed() {
    // Crear usuarios de ejemplo
    const users: CreateUserDto[] = [
      {
        firstName: 'Luis',
        lastName: 'Lopez',
        email: 'luis@gmail.com',
        username: 'luis_lopez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
      },
      {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria@gmail.com',
        username: 'maria_garcia',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '12345678',
      },
      {
        firstName: 'Ana',
        lastName: 'Gomez',
        email: 'ana@gmail.com',
        username: 'ana_gomez',
        password: 'P4ssWord@123',
        confirmPassword: 'P4ssWord@123',
        birthdate: '2000-01-01',
        nDni: '87654321',
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
