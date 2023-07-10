import { AppDataSource } from '../data-source';
import { Rol } from '../entities/rol.entity';
import { generateManyRoles } from '../random/rol.random';

export const inserRoles = async () => {
  const rolesRepo = AppDataSource.getRepository(Rol);

  const roles = generateManyRoles();

  await rolesRepo.insert(roles);
};
