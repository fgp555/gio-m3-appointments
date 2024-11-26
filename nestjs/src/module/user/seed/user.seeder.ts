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
        firstName: 'Luis Alberto',
        lastName: 'Martínez López',
        email: 'admin.luis.martinez@cliniccare.com',
        whatsapp: '+5491123456789',
        username: 'admin_luis',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1985-07-15',
        nDni: '30123456',
        role: 'admin',
      },
      {
        firstName: 'María Fernanda',
        lastName: 'Fernández García',
        email: 'maria.fernandez@cliniccare.com',
        whatsapp: '+5491123456790',
        username: 'patient_maria',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1992-05-22',
        nDni: '27894561',
        role: 'patient',
      },
      {
        firstName: 'Pedro Javier',
        lastName: 'Ramírez Gómez',
        email: 'pedro.ramirez@cliniccare.com',
        whatsapp: '+5491123456791',
        username: 'patient_pedro',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1988-11-03',
        nDni: '29123847',
        role: 'patient',
      },
      {
        firstName: 'Laura Isabel',
        lastName: 'Gómez Pérez',
        email: 'laura.gomez@cliniccare.com',
        whatsapp: '+5491123456792',
        username: 'patient_laura',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1995-09-15',
        nDni: '30456789',
        role: 'patient',
      },
      {
        firstName: 'Carlos Andrés',
        lastName: 'López Rodríguez',
        email: 'carlos.lopez@cliniccare.com',
        whatsapp: '+5491123456793',
        username: 'doctor_carlos',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1980-03-10',
        nDni: '26543210',
        role: 'doctor',
      },
      {
        firstName: 'Sofía Elena',
        lastName: 'Rodríguez Hernández',
        email: 'sofia.rodriguez@cliniccare.com',
        whatsapp: '+5491123456794',
        username: 'doctor_sofia',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1987-06-20',
        nDni: '28903210',
        role: 'doctor',
      },
      {
        firstName: 'Ana Patricia',
        lastName: 'Pérez Muñoz',
        email: 'ana.perez@cliniccare.com',
        whatsapp: '+5491123456795',
        username: 'doctor_ana',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1990-01-25',
        nDni: '27654321',
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
