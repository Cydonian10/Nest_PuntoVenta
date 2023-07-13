import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { AuthLoginDto, AuthRegisterDto } from '@/dtos';
import { IPayload } from '@/common/interfaces';

import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async registrarUsuario(dto: AuthRegisterDto) {
    const user = await this.userService.findOneByDNI(dto.dni);
    if (user) {
      throw new ConflictException('DNI ya existe en la base de datos');
    }

    const newUser = this.userService.crear(dto);

    return newUser;
  }

  async validarUsuario(dni: string, password: string) {
    const user = await this.userService.findOneByDNI(dni);

    if (!user) {
      throw new UnauthorizedException('Invalid credentianls email');
    }

    const isMatch = compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentianls password');
    }

    delete user.password;

    return user;
  }

  async login({ dni, password }: AuthLoginDto) {
    const user = await this.validarUsuario(dni, password);

    const payload: IPayload = {
      name: user.nombre,
      userId: user.id,
      roles: user.roles,
    };

    // genero el access_token
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
