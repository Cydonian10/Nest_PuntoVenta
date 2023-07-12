import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../database/entities/categoria.entity';
import { Repository } from 'typeorm';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto, UpdateCategoriaDto } from '../dtos/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
  ) {}

  // todos las categorias
  getAll(): Promise<Categoria[]> {
    return this.categoriaRepo.find();
  }

  // creando una categoria
  async create(dto: CreateCategoriaDto) {
    const categoria = new Categoria();
    categoria.nombre = dto.nombre;

    return this.categoriaRepo.save(categoria);
  }

  // enonctrar una categoria
  async findOne(id: Categoria['id']): Promise<Categoria> {
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
  async remove(id: Categoria['id']): Promise<Categoria['id']> {
    const categoria = await this.searchById(id);

    try {
      await this.categoriaRepo.delete(categoria.id);
      return id;
    } catch (error) {
      throw new ConflictException();
    }
  }

  // actualizando categoria
  async update(dto: UpdateCategoriaDto, id: Categoria['id']): Promise<Categoria> {
    const categoria = await this.searchById(id);
    this.categoriaRepo.merge(categoria, dto);
    return this.categoriaRepo.save(categoria);
  }

  // encontrar categoria por id
  async searchById(id: Categoria['id']): Promise<Categoria> {
    const categoria = await this.categoriaRepo.findOne({ where: { id } });

    if (!categoria) {
      throw new NotFoundException('Error');
    }

    return categoria;
  }
}
