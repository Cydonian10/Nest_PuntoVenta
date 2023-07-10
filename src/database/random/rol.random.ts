import { CreateRolDto } from '../../dtos/rol.dto';

const rolesArray: string[] = ['administrador', 'vendedor'];

export function generateOneRol(position: number): CreateRolDto {
  return {
    nombre: rolesArray[position],
    descripcion: 'bla bla bla',
  };
}

export function generateManyRoles(size = 2) {
  const roles = [];
  for (let index = 0; index <= size - 1; index++) {
    roles.push(generateOneRol(index));
  }

  return roles;
}
