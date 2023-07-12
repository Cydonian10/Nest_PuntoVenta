import { faker } from '@faker-js/faker';
import { CreateClienteDto } from '../../dtos/cliente.dto';

export function generateOneCliente(): CreateClienteDto {
  return {
    avatar: faker.internet.avatar(),
    nombre: faker.person.firstName(),
    direccion: faker.location.direction(),
  };
}

export function generateManyClientes(size = 10) {
  const clientes = [];

  for (let i = 0; i < size; i++) {
    clientes.push(generateOneCliente());
  }

  return clientes;
}
