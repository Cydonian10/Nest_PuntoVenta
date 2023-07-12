import { AppDataSource } from '../data-source';
import { Cliente } from '../entities/cliente.entity';
import { generateManyClientes } from '../random/cliente.random';

export const insertClientes = async () => {
  const clienteRepo = AppDataSource.getRepository(Cliente);

  const clientes = generateManyClientes();

  await clienteRepo.insert(clientes);
};
