import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { MailTemplatesService } from '../mail/mail-template.service';
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    private readonly emailTemplatesService;
    constructor(userService: UserService, jwtService: JwtService, emailTemplatesService: MailTemplatesService);
    signup(body: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        birthdate: string;
        nDni: string;
        image: string;
        role: "patient" | "professional" | "admin";
        title: string;
        specialization: string;
        bio: string;
        appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
        appointmentsAsProfessional: import("../appointment/entities/appointment.entity").Appointment[];
        gender?: "woman" | "man";
        createdAt: Date;
    } | {
        withoutPassword: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            username: string;
            birthdate: string;
            nDni: string;
            image: string;
            role: "patient" | "professional" | "admin";
            title: string;
            specialization: string;
            bio: string;
            appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
            appointmentsAsProfessional: import("../appointment/entities/appointment.entity").Appointment[];
            gender?: "woman" | "man";
            createdAt: Date;
        };
        sendMail: {
            message: string;
            result: any;
        };
    }>;
    singin(createAuthDto: CreateAuthDto): Promise<{
        login: boolean;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            username: string;
            birthdate: string;
            nDni: string;
            image: string;
            role: "patient" | "professional" | "admin";
            title: string;
            specialization: string;
            bio: string;
            appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
            appointmentsAsProfessional: import("../appointment/entities/appointment.entity").Appointment[];
            gender?: "woman" | "man";
            createdAt: Date;
        };
        token: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        birthdate: string;
        nDni: string;
        image: string;
        role: "patient" | "professional" | "admin";
        title: string;
        specialization: string;
        bio: string;
        appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
        appointmentsAsProfessional: import("../appointment/entities/appointment.entity").Appointment[];
        gender?: "woman" | "man";
        createdAt: Date;
    }>;
}
