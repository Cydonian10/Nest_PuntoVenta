import { IsNotEmpty } from 'class-validator';
import { Rol } from '../database/entities/rol.entity';

export class AuthRegisterDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  rol: Rol[];

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
