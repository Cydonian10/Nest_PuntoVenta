import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/producto.dto';
import { CategoriaService } from './categoria.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    private categoriaSrv: CategoriaService,
  ) {}

  getAll() {
    return this.productoRepo.find({
      relations: { categoria: true },
      select: { categoria: { name: true, id: true } },
    });
  }

  async create(dto: CreateProductDto): Promise<Producto> {
    const categoria = await this.categoriaSrv.searchById(dto.categoryId);

    const newProduct = this.productoRepo.create({
      name: dto.name,
      categoria,
    });

    return this.productoRepo.save(newProduct);
  }

  async update(dto: UpdateProductDto, id: Producto['id']) {
    const product = await this.productoRepo.findOne({ where: { id } });

    if (dto.categoryId) {
      const categoria = await this.categoriaSrv.searchById(dto.categoryId);
      product.categoria = categoria;
    }

    this.productoRepo.merge(product, dto);

    return this.productoRepo.save(product);
  }

  async findOne(id: Producto['id']) {
    const product = await this.productoRepo.findOne({
      where: { id },
      relations: { categoria: true },
      select: { categoria: { name: true } },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async remove(id: Producto['id']) {
    const product = await this.searchById(id);

    try {
      await this.productoRepo.delete(product.id);
      return id;
    } catch (error) {
      console.log(error);
      throw new ConflictException();
    }
  }

  async searchById(id: Producto['id']): Promise<Producto> {
    const product = await this.productoRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
