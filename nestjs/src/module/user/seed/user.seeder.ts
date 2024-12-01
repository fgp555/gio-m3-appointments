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
      // Usuarios de ejemplo
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
        firstName: 'Carlos Eduardo',
        lastName: 'López Rodríguez',
        email: 'carlos.lopez@cliniccare.com',
        whatsapp: '+5491123456793',
        username: 'patient_carlos',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1990-03-07',
        nDni: '29012345',
        role: 'patient',
      },
      {
        firstName: 'Sofía',
        lastName: 'Gómez Rodríguez',
        email: 'sofia.gomez@cliniccare.com',
        whatsapp: '+5491123456794',
        username: 'patient_sofia',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1998-07-12',
        nDni: '30234567',
        role: 'patient',
      },
      {
        firstName: 'Javier',
        lastName: 'Gómez Rodríguez',
        email: 'javier.gomez@cliniccare.com',
        whatsapp: '+5491123456795',
        username: 'patient_javier',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1997-06-09',
        nDni: '30123456',
        role: 'patient',
      },
      {
        firstName: 'Marta',
        lastName: 'Gómez Rodríguez',
        email: 'marta.gomez@cliniccare.com',
        whatsapp: '+5491123456796',
        username: 'patient_marta',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1996-05-08',
        nDni: '30012345',
        role: 'patient',
        // image: 'https://randomuser.me/api/portraits/women/69.jpg',
      },
      // Profesionales
      {
        title: 'Licenciado',
        firstName: 'Matías',
        lastName: 'Rodríguez',
        email: 'matias.rodriguez@cliniccare.com',
        whatsapp: '+5491123456796',
        username: 'professional_matias',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1982-04-10',
        nDni: '30765432',
        role: 'professional',
        image: 'https://i.postimg.cc/nchWgyY7/01.jpg',
        specialization: 'Rehabilitación Deportiva',
        bio: 'Licenciado Rodríguez Matías se especializa en la rehabilitación de lesiones deportivas. Con su enfoque personalizado y su compromiso con la excelencia, ayuda a deportistas a recuperarse y mejorar su rendimiento.',
      },
      {
        title: 'Licenciada',
        firstName: 'Natali',
        lastName: 'M R',
        email: 'natali@cliniccare.com',
        whatsapp: '+5491123456797',
        username: 'professional_giovanna',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1985-08-30',
        nDni: '28675431',
        role: 'professional',
        image: 'https://i.postimg.cc/HW2KSY5d/02.jpg',
        specialization: 'RPG, Drenaje Linfático y Pilates',
        bio: 'Licenciada Martínez Russo Giovanna cuenta con experiencia en Reeducación Postural Global (RPG), drenaje linfático y Pilates. Su dedicación y conocimientos avanzados en estas áreas son fundamentales para nuestro equipo.',
      },
      {
        title: 'Licenciado',
        firstName: 'Gonzalo',
        lastName: 'Rodríguez',
        email: 'gonzalo.rodriguez@cliniccare.com',
        whatsapp: '+5491123456798',
        username: 'professional_gonzalo',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1980-12-15',
        nDni: '28564321',
        role: 'professional',
        image: 'https://i.postimg.cc/ZnVM0HZC/03.jpg',
        specialization: 'Osteopatía',
        bio: 'Licenciado Rodríguez Gonzalo es experto en osteopatía, utilizando técnicas avanzadas para tratar diversas condiciones musculoesqueléticas. Su enfoque holístico y su pasión por el bienestar del paciente aseguran tratamientos efectivos y una pronta recuperación.',
      },
      {
        firstName: 'Luis Admin',
        lastName: 'Martínez López',
        email: 'admin@cliniccare.com',
        whatsapp: '+5491123456789',
        username: 'admin_luis',
        password: 'SecurePass@2023',
        confirmPassword: 'SecurePass@2023',
        birthdate: '1985-07-15',
        nDni: '30123456',
        role: 'admin',
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
