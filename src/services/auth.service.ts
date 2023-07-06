import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthLoginDto, AuthRegisterEmpleadoDto } from '../dtos/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async registerEmpleado(dto: AuthRegisterEmpleadoDto) {
    //token
    //retornamos token
  }

  async registerCliente(dto: AuthRegisterEmpleadoDto) {
    //token
    //retornamos token
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentianls email');
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentianls password');
    }

    delete user.password;

    return user;
  }

  async login({ email, password }: AuthLoginDto) {
    const user = await this.validateUser(email, password);

    // genero el access_token

    return user;
  }

  // registerCliente() {}

  // login() {}
}
