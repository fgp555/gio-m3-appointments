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
                firstName: 'Lionel',
                lastName: 'Messi',
                email: 'lionel.messi@cliniccare.com',
                whatsapp: '+5491123456790',
                username: 'patient_lionel',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1987-06-24',
                nDni: '27894561',
                role: 'patient',
            },
            {
                firstName: 'Frida',
                lastName: 'Kahlo',
                email: 'frida.kahlo@cliniccare.com',
                whatsapp: '+5491123456791',
                username: 'patient_frida',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1907-07-06',
                nDni: '29123847',
                role: 'patient',
            },
            {
                firstName: 'Albert',
                lastName: 'Einstein',
                email: 'albert.einstein@cliniccare.com',
                whatsapp: '+5491123456792',
                username: 'patient_albert',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1879-03-14',
                nDni: '30456789',
                role: 'patient',
            },
            {
                firstName: 'Marie',
                lastName: 'Curie',
                email: 'marie.curie@cliniccare.com',
                whatsapp: '+5491123456793',
                username: 'patient_marie',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1867-11-07',
                nDni: '29012345',
                role: 'patient',
            },
            {
                firstName: 'Serena',
                lastName: 'Williams',
                email: 'serena.williams@cliniccare.com',
                whatsapp: '+5491123456794',
                username: 'patient_serena',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1981-09-26',
                nDni: '30234567',
                role: 'patient',
            },
            {
                firstName: 'Pablo',
                lastName: 'Picasso',
                email: 'pablo.picasso@cliniccare.com',
                whatsapp: '+5491123456795',
                username: 'patient_pablo',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1881-10-25',
                nDni: '30123456',
                role: 'patient',
            },
            {
                firstName: 'Malala',
                lastName: 'Yousafzai',
                email: 'malala.yousafzai@cliniccare.com',
                whatsapp: '+5491123456796',
                username: 'patient_malala',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1997-07-12',
                nDni: '30012345',
                role: 'patient',
            },
            {
                title: 'Doctor',
                firstName: 'Hippocrates',
                lastName: 'of Kos',
                email: 'hippocrates.kos@cliniccare.com',
                whatsapp: '+5491123456802',
                username: 'professional_hippocrates',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '460 BC',
                nDni: '29543218',
                role: 'professional',
                image: 'https://i.postimg.cc/nchWgyY7/01.jpg',
                specialization: 'General Medicine',
                bio: 'Considered the father of medicine, Hippocrates laid the foundation of modern medical ethics and practices.',
            },
            {
                title: 'Licenciada',
                firstName: 'Jane',
                lastName: 'Goodall',
                email: 'jane.goodall@cliniccare.com',
                whatsapp: '+5491123456804',
                username: 'professional_jane',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1934-04-03',
                nDni: '32547890',
                role: 'professional',
                image: 'https://i.postimg.cc/HW2KSY5d/02.jpg',
                specialization: 'Primatology',
                bio: 'Dr. Jane Goodall is renowned for her groundbreaking research on chimpanzees and advocacy for conservation.',
            },
            {
                title: 'Doctor',
                firstName: 'Sigmund',
                lastName: 'Freud',
                email: 'sigmund.freud@cliniccare.com',
                whatsapp: '+5491123456803',
                username: 'professional_sigmund',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1856-05-06',
                nDni: '29304567',
                role: 'professional',
                image: 'https://i.postimg.cc/1tF2NNNy/03.jpg',
                specialization: 'Psychoanalysis',
                bio: 'The pioneer of psychoanalysis, Freud revolutionized the understanding of human psychology and behavior.',
            },
            {
                title: 'Licenciada',
                firstName: 'Valeria',
                lastName: 'Silva',
                email: 'valeria.silva@cliniccare.com',
                whatsapp: '+5491123456804',
                username: 'professional_valeria',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '1993-02-14',
                nDni: '32547890',
                role: 'professional',
                image: 'https://i.postimg.cc/HW2KSY5d/02.jpg',
                specialization: 'Kinesiología Pediátrica',
                bio: 'Licenciada Silva Valeria cuenta con una sólida experiencia en kinesiología pediátrica, ayudando a niños a superar dificultades físicas y mejorar su calidad de vida. Su pasión y empatía destacan en cada tratamiento.',
            },
            {
                title: 'Administrador',
                firstName: 'Admin',
                lastName: 'ClinicCare',
                email: 'admin@cliniccare.com',
                whatsapp: '+5491123456805',
                username: 'admin',
                password: 'SecurePass@2023',
                confirmPassword: 'SecurePass@2023',
                birthdate: '2022-01-01',
                nDni: '30000000',
                role: 'admin',
                image: 'https://i.postimg.cc/1tF2NNNy/03.jpg',
                specialization: 'Psychoanalysis',
                bio: 'The pioneer of psychoanalysis, Freud revolutionized the understanding of human psychology and behavior.',
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