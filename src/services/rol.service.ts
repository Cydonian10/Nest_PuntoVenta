import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../database/entities/rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from '../dtos/rol.dto';

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
}
