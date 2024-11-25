import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<void>;
}