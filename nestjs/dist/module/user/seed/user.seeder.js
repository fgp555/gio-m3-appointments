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