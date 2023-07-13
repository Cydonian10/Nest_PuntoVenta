import { AppDataSource } from '../data-source';
import { ClienteEntity } from '@/entities/cliente.entity';
import { generateManyClientes } from '../random/cliente.random';

export const insertClientes = async () => {
  const clienteRepo = AppDataSource.getRepository(ClienteEntity);

  const clientes = generateManyClientes();

  await clienteRepo.insert(clientes);
};
