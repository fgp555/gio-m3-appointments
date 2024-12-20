import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { MailTemplatesService } from '../mail/mail-template.service';
export declare class AppointmentController {
    private readonly appointmentService;
    private readonly emailTemplatesService;
    constructor(appointmentService: AppointmentService, emailTemplatesService: MailTemplatesService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findPendingAppointmentsByProfessional(professionalId: number): Promise<Appointment[]>;
    findLast(count: string): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<void>;
    cancel(id: number): Promise<Appointment>;
}
