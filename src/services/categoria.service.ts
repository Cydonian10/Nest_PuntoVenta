import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from '@/entities/categoria.entity';
import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dtos/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepo: Repository<CategoriaEntity>,
  ) {}

  // todos las categorias
  getAll(): Promise<CategoriaEntity[]> {
    return this.categoriaRepo.find();
  }

  // creando una categoria
  async create(dto: CreateCategoriaDto) {
    const categoria = new CategoriaEntity();
    categoria.nombre = dto.nombre;

    return this.categoriaRepo.save(categoria);
  }

  // enonctrar una categoria
  async findOne(id: CategoriaEntity['id']): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepo.findOne({
      where: { id },
      relations: { productos: true },
    });

    if (!categoria) {
      throw new NotFoundException('Error');
    }

    return categoria;
  }

  // eliminar una categoria
  async remove(id: CategoriaEntity['id']): Promise<CategoriaEntity['id']> {
    const categoria = await this.searchById(id);

    try {
      await this.categoriaRepo.delete(categoria.id);
      return id;
    } catch (error) {
      throw new ConflictException();
    }
  }

  // actualizando categoria
  async update(dto: UpdateCategoriaDto, id: CategoriaEntity['id']): Promise<CategoriaEntity> {
    const categoria = await this.searchById(id);
    this.categoriaRepo.merge(categoria, dto);
    return this.categoriaRepo.save(categoria);
  }

  // encontrar categoria por id
  async searchById(id: CategoriaEntity['id']): Promise<CategoriaEntity> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });

    if (!categoria) {
      throw new NotFoundException('Error');
    }

    return categoria;
  }
}
