import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UserService } from '../user/user.service';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly userService;
    constructor(appointmentRepository: Repository<Appointment>, userService: UserService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: number): Promise<void>;
    findOneByDateAndDescription(date: string, description: string): Promise<Appointment>;
}
