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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./module/user/user.module");
const info_module_1 = require("./info/info.module");
const db_module_1 = require("./config/db.module");
const auth_module_1 = require("./module/auth/auth.module");
const appointment_module_1 = require("./module/appointment/appointment.module");
const user_seeder_1 = require("./module/user/seed/user.seeder");
const appointment_seeder_1 = require("./module/appointment/seed/appointment.seeder");
const backup_db_module_1 = require("./tools/backup-db/backup-db.module");
let AppModule = class AppModule {
    constructor(userSeederService, appointmentSeederService) {
        this.userSeederService = userSeederService;
        this.appointmentSeederService = appointmentSeederService;
        this.seed();
    }
    async seed() {
        await this.userSeederService.seed();
        await this.appointmentSeederService.seed();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_module_1.DbModule,
            info_module_1.InfoModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            appointment_module_1.AppointmentModule,
            backup_db_module_1.BackupDBModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [user_seeder_1.UserSeederService,
        appointment_seeder_1.AppointmentSeederService])
], AppModule);
//# sourceMappingURL=app.module.js.map