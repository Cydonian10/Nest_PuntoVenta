import { CreateEmpleadoDto } from './empleado.dto';
import { EmpleadoRol } from '../interfaces/rol.enum';
import { IsNotEmpty } from 'class-validator';

export class AuthRegisterEmpleadoDto implements CreateEmpleadoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  rol: EmpleadoRol;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthRegisterClienteDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthLoginDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
