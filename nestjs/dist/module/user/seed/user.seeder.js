"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeederService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
let UserSeederService = class UserSeederService {
    constructor(userService) {
        this.userService = userService;
    }
    async seed() {
        const users = [
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
        for (const user of users) {
            try {
                const existingUser = await this.userService.findByEmail(user.email);
                if (existingUser) {
                    console.log(`User with email ${user.email} already exists.`);
                    continue;
                }
                await this.userService.create(user);
                console.log(`User ${user.firstName} created successfully.`);
            }
            catch (error) {
                console.error(`Failed to create user ${user.firstName}: ${error.message}`);
            }
        }
    }
};
exports.UserSeederService = UserSeederService;
exports.UserSeederService = UserSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserSeederService);
//# sourceMappingURL=user.seeder.js.map