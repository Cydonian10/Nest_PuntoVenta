import { Rol } from '@/entities/rol.entity';
import { CreateRolDto } from '@/dtos';

import { AppDataSource } from '../data-source';

const rolesArray: string[] = ['administrador', 'vendedor'];

function generateOneRol(position: number): CreateRolDto {
  return {
    nombre: rolesArray[position],
    descripcion: 'bla bla bla',
  };
}

function generateManyRoles(size = 2) {
  const roles = [];
  for (let index = 0; index < size; index++) {
    roles.push(generateOneRol(index));
  }

  return roles;
}

export const inserRoles = async () => {
  const rolesRepo = AppDataSource.getRepository(Rol);

  const roles = generateManyRoles();

  await rolesRepo.insert(roles);
};
