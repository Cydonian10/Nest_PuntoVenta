import { UsuarioEntity } from '@/entities/usuario.entity';
import { AppDataSource } from '../data-source';
import { generateManyUsuarios } from '../random/usuario.random';

export const insertUsuarios = async () => {
  const usuarioRepo = AppDataSource.getRepository(UsuarioEntity);

  const usuarios = await generateManyUsuarios();

  await usuarioRepo.insert(usuarios);
};
