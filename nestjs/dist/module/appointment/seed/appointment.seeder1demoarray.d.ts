import { AppointmentService } from '../appointment.service';
import { UserService } from 'src/module/user/user.service';
export declare class AppointmentSeederService {
    private readonly appointmentService;
    private readonly userService;
    constructor(appointmentService: AppointmentService, userService: UserService);
    seed(): Promise<void>;
}
