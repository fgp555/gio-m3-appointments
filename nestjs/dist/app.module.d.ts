import { UserSeederService } from './module/user/seed/user.seeder';
import { AppointmentSeederService } from './module/appointment/seed/appointment.seeder';
export declare class AppModule {
    private readonly userSeederService;
    private readonly appointmentSeederService;
    constructor(userSeederService: UserSeederService, appointmentSeederService: AppointmentSeederService);
    private seed;
}
