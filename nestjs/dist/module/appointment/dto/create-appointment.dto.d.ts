export declare class CreateAppointmentDto {
    date: string;
    description: string;
    patientId?: number;
    doctorId?: number;
    status?: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'RESCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'NO_SHOW';
}
