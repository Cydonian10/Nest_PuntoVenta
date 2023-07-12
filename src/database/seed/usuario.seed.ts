import { AppDataSource } from '../data-source';
import { User } from '../entities/user.entity';
import { generateManyUsuarios } from '../random/usuario.random';

export const insertUsuarios = async () => {
  const usuarioRepo = AppDataSource.getRepository(User);

  const usuarios = await generateManyUsuarios();

  await usuarioRepo.insert(usuarios);
};
