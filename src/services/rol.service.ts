import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../database/entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto, UpdateRolDto } from '../dtos/rol.dto';

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private rolRepository: Repository<Rol>) {}

  /**
   * Crear un rol para usuarios
   */
  crear(dto: CreateRolDto) {
    const newRol = this.rolRepository.create(dto);
    return this.rolRepository.save(newRol);
  }

  /**
   * Retornar todos los roles
   */
  getAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  /**
   * Encontrar un rol
   */
  async findOne(id: Rol['id']): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { id } });

    if (!rol) throw new NotFoundException('Rol no encontrado');

    return rol;
  }

  /**
   * Actulizar un rol
   */
  async update(dto: UpdateRolDto, id: Rol['id']): Promise<Rol> {
    const rol = await this.findOne(id);

    this.rolRepository.merge(rol, dto);

    return this.rolRepository.save(rol);
  }

  /**
   * Eliminar un rol
   */
  async remove(id: Rol['id']): Promise<Rol['id']> {
    const rol = await this.findOne(id);

    await this.rolRepository.delete(rol.id);

    return id;
  }
}
