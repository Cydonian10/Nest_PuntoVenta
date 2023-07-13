import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteEntity } from '@/entities/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto, UpdateClienteDto } from '../dtos/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(ClienteEntity) private clienteRepository: Repository<ClienteEntity>,
  ) {}

  findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: ClienteEntity['id']): Promise<ClienteEntity> {
    const cliente = this.clienteRepository.findOne({ where: { id } });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  create(dto: CreateClienteDto) {
    const newCliente = this.clienteRepository.create(dto);

    return this.clienteRepository.save(newCliente);
  }

  async update(dto: UpdateClienteDto, id: ClienteEntity['id']) {
    const cliente = await this.findOne(id);
    this.clienteRepository.merge(cliente, dto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: ClienteEntity['id']) {
    const cliente = await this.findOne(id);
    await this.clienteRepository.delete(cliente.id);
    return { id: cliente.id };
  }
}
