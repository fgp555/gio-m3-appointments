import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { UserService } from '../user/user.service';
import { MailTemplatesService } from '../mail/mail-template.service';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly userService;
    private readonly emailTemplatesService;
    constructor(appointmentRepository: Repository<Appointment>, userService: UserService, emailTemplatesService: MailTemplatesService);
    create(appointmentData: Partial<Appointment>): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    findPendingAppointmentsByProfessionalId(professionalId: number): Promise<Appointment[]>;
    findLast(count: string): Promise<Appointment[]>;
    update(id: number, appointmentData: Partial<Appointment>): Promise<Appointment>;
    delete(id: number): Promise<void>;
    findOneByDateAndDescription(date: string, description: string): Promise<Appointment>;
    cancel(id: number): Promise<Appointment>;
}
