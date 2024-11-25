import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signup(createAuthDto: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        birthdate: string;
        nDni: string;
        image: string;
        role: "patient" | "doctor" | "admin";
        appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
        appointmentsAsDoctor: import("../appointment/entities/appointment.entity").Appointment[];
        createdAt: Date;
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
            role: "patient" | "doctor" | "admin";
            appointmentsAsPatient: import("../appointment/entities/appointment.entity").Appointment[];
            appointmentsAsDoctor: import("../appointment/entities/appointment.entity").Appointment[];
            createdAt: Date;
        };
        token: string;
    }>;
}
