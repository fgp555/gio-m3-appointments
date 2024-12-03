import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserSeederService } from './seed/user.seeder';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, ],
  providers: [UserService, UserSeederService, AuthController],
  exports: [UserService, UserSeederService],
})
export class UserModule {}
