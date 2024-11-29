import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Put,
  Param,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { log } from 'console';
import { UpdateUserDto } from '../user/dtos/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  // @UseGuards(AuthGuard)
  async signup(@Body() createAuthDto: any) {
    const foundEmail = await this.userService.findOneEmail(createAuthDto.email);

    if (foundEmail)
      throw new UnauthorizedException('This email already exists');

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    createAuthDto.password = hashedPassword;
    const userCreate = await this.userService.create(createAuthDto);
    const { password, ...withoutPassword } = userCreate;
    return withoutPassword;
  }

  @Post('signin')
  async singin(@Body() createAuthDto: CreateAuthDto) {
    const foundEmail = await this.userService.findOneEmail(createAuthDto.email);

    if (!foundEmail)
      throw new UnauthorizedException('Incorrect email or password');

    const isPasswordValid = await bcrypt.compare(
      createAuthDto.password,
      foundEmail.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect email or password');

    const { password, ...user } = foundEmail;

    const userPayload = {
      sub: foundEmail.id,
      id: foundEmail.id,
      email: foundEmail.email,
    };

    const token = this.jwtService.sign(userPayload);

    return { login: true, user, token };
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Hash the password if it exists in the payload
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      const { password, ...withoutPassword } = updatedUser;
      console.log('password', password);
      return withoutPassword;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user',
        error.message,
      );
    }
  }
}
