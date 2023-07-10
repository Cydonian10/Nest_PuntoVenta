import { IsArray, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  dni: string;

  @IsArray()
  @IsNotEmpty()
  rolIds: number[];

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  direccion: string;
}

export class AuthLoginDto {
  @IsNotEmpty()
  dni: string;

  @IsNotEmpty()
  password: string;
}
