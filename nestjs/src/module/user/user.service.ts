// back\src\module\user\user.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // Check if a user with the given email already exists
    const existingUser = await this.findByEmail(createUserDto.email).catch(
      () => null,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      // If email does not exist, create and save the new user
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create user',
        error.message,
      );
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch users',
        error.message,
      );
    }
  }

  // En el servicio de usuario
  async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email) {
      throw new BadRequestException('Email must be provided');
    }

    // Busca al usuario por el email
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user || null; // Si no se encuentra, retorna null
  }

  async findOneEmail(email: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async findOne(id: string): Promise<UserEntity> {
    if (!id || isNaN(Number(id))) {
      throw new BadRequestException('Invalid ID format');
    }

    const user = await this.userRepository.findOne({
      where: { id: Number(id) },
      relations: ['appointmentsAsPatient', 'appointmentsAsProfessional'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Find user by ID for seeder
  async findById(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['appointmentsAsPatient', 'appointmentsAsProfessional'],
    });
  }

  async findByRole(role: 'admin' | 'patient' | 'professional') {
    return await this.userRepository.find({
      where: { role },
      relations: ['appointmentsAsPatient', 'appointmentsAsProfessional'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id); // Ensures the user exists or throws an error

    try {
      const userCreate = this.userRepository.create(updateUserDto);
      const userUpdate = await this.userRepository.update(id, userCreate);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    try {
      return await this.userRepository.remove(user);
    } catch (error) {
      if (error.message.includes('violates foreign key constraint')) {
        // Mensaje específico para errores de clave foránea
        throw new InternalServerErrorException(
          'No se puede eliminar el usuario porque está relacionado con otras entidades (como citas). Elimina primero esas relaciones.',
        );
      }

      // Otros errores inesperados
      throw new InternalServerErrorException(
        'Error al intentar eliminar al usuario. Por favor, inténtalo de nuevo más tarde.',
        error.message,
      );
    }
  }
}
