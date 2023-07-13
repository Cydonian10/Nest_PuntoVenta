import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthLoginDto, AuthRegisterDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { DUser } from '@/common/decorators/user.decorator';
import { IPayload } from '@/common/interfaces/payload.interface';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post()
  async registerEmpleado(@Body() dto: AuthRegisterDto) {
    const newUserEmpleado = await this.authService.registrarUsuario(dto);
    return newUserEmpleado;
  }

  @Post('login')
  async login(@Body() dto: AuthLoginDto) {
    const user = await this.authService.login(dto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@DUser() userPyload: IPayload) {
    return this.userService.perfil(userPyload.userId);
  }
}
