import { ClienteEntity } from '@/entities/cliente.entity';
import { CreateClienteDto } from '@/dtos';

import { AppDataSource } from '../data-source';
import { faker } from '@faker-js/faker';

function generateOneCliente(): CreateClienteDto {
  return {
    avatar: faker.internet.avatar(),
    nombre: faker.person.firstName(),
    direccion: faker.location.direction(),
  };
}

function generateManyClientes(size = 10) {
  const clientes = [];

  for (let i = 0; i < size; i++) {
    clientes.push(generateOneCliente());
  }

  return clientes;
}

export const insertClientes = async () => {
  const clienteRepo = AppDataSource.getRepository(ClienteEntity);

  const clientes = generateManyClientes();

  await clienteRepo.insert(clientes);
};
