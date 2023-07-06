import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterEmpleadoDto } from 'src/dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async registerEmpleado(@Body() dto: AuthRegisterEmpleadoDto) {
    const newUserEmpleado = await this.authService.registerEmpleado(dto);
    return newUserEmpleado;
  }

  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    const user = await this.authService.login(dto);
    return user;
  }
}
