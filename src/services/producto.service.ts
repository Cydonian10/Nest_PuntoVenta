import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from '@/entities/producto.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto, FilterProductDto } from '@/dtos/producto.dto';
import { CategoriaService } from './categoria.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity) private productoRepo: Repository<ProductoEntity>,
    private categoriaSrv: CategoriaService,
  ) {}

  getAll(params?: FilterProductDto) {
    if (params) {
      const where: FindOptionsWhere<ProductoEntity> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.precio = Between(minPrice, maxPrice);
      }
      return this.productoRepo.find({
        relations: { categoria: true },
        select: { categoria: { nombre: true, id: true } },
        where,
        take: limit,
        skip: offset,
        order: { id: 'ASC' },
      });
    }

    return this.productoRepo.find({
      relations: { categoria: true },
      select: { categoria: { nombre: true, id: true } },
      order: { id: 'ASC' },
    });
  }

  async create(dto: CreateProductDto): Promise<ProductoEntity> {
    const categoria = await this.categoriaSrv.searchById(dto.categoriaId);

    const newProduct = this.productoRepo.create({
      nombre: dto.nombre,
      categoria,
    });

    return this.productoRepo.save(newProduct);
  }

  async update(dto: UpdateProductDto, id: ProductoEntity['id']) {
    const product = await this.productoRepo.findOne({ where: { id } });

    if (dto.categoriaId) {
      const categoria = await this.categoriaSrv.searchById(dto.categoriaId);
      product.categoria = categoria;
    }

    this.productoRepo.merge(product, dto);

    return this.productoRepo.save(product);
  }

  async findOne(id: ProductoEntity['id']) {
    const product = await this.productoRepo.findOne({
      where: { id },
      relations: { categoria: true },
      select: { categoria: { nombre: true } },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async remove(id: ProductoEntity['id']) {
    const product = await this.searchById(id);

    try {
      await this.productoRepo.delete(product.id);
      return id;
    } catch (error) {
      console.log(error);
      throw new ConflictException();
    }
  }

  async searchById(id: ProductoEntity['id']): Promise<ProductoEntity> {
    const product = await this.productoRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
