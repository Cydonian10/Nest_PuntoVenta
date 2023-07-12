import { hash } from 'bcrypt';
import { AuthRegisterDto } from 'src/dtos/auth.dto';

export function generateOneUsuario() {}

export async function generateManyUsuarios(): Promise<AuthRegisterDto[]> {
  return [
    {
      nombre: 'Gabriel',
      direccion: 'Jauja',
      dni: '71232786',
      email: 'gabriel@hotmail.com',
      password: await hash('123456', 10),
      rolIds: [1],
    },
    {
      nombre: 'Mabel',
      direccion: 'Huala',
      dni: '7328976',
      email: 'mabel@hotmail.com',
      password: await hash('123456', 10),
      rolIds: [2],
    },
  ];
}
