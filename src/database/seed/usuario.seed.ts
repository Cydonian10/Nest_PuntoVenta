import { hash } from 'bcrypt';
import { UsuarioEntity } from '@/entities/usuario.entity';
import { AuthRegisterDto } from '@/dtos';

import { AppDataSource } from '../data-source';

//function generateOneUsuario() {}

async function generateManyUsuarios(): Promise<AuthRegisterDto[]> {
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

export const insertUsuarios = async () => {
  const usuarioRepo = AppDataSource.getRepository(UsuarioEntity);

  const usuarios = await generateManyUsuarios();

  await usuarioRepo.insert(usuarios);
};
