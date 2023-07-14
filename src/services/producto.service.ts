import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from '@/entities/producto.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto, FilterProductDto } from '@/dtos/producto.dto';
import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from '@/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity) private productoRepository: Repository<ProductoEntity>,
    private categoriaSrv: CategoriaService,
  ) {}

  getAll(params?: FilterProductDto) {
    if (params) {
      const where: FindOptionsWhere<ProductoEntity> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.precio = Between(minPrice, maxPrice);
      }
      return this.productoRepository.find({
        relations: { categoria: true },
        select: { categoria: { nombre: true, id: true } },
        where,
        take: limit,
        skip: offset,
        order: { id: 'ASC' },
      });
    }

    return this.productoRepository.find({
      relations: { categoria: true },
      select: { categoria: { nombre: true, id: true } },
      order: { id: 'ASC' },
    });
  }

  getAllByCategoria(categoriaId: CategoriaEntity['id']) {
    return this.productoRepository.find({
      where: { categoriaId: categoriaId },
      relations: { categoria: true },
    });
  }

  async create(dto: CreateProductDto): Promise<ProductoEntity> {
    const categoria = await this.categoriaSrv.searchById(dto.categoriaId);

    const newProduct = this.productoRepository.create({
      nombre: dto.nombre,
      categoria,
    });

    return this.productoRepository.save(newProduct);
  }

  async update(dto: UpdateProductDto, id: ProductoEntity['id']) {
    const product = await this.productoRepository.findOne({ where: { id } });

    if (dto.categoriaId) {
      const categoria = await this.categoriaSrv.searchById(dto.categoriaId);
      product.categoria = categoria;
    }

    this.productoRepository.merge(product, dto);

    return this.productoRepository.save(product);
  }

  async findOne(id: ProductoEntity['id']) {
    const product = await this.productoRepository.findOne({
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
      await this.productoRepository.delete(product.id);
      return id;
    } catch (error) {
      console.log(error);
      throw new ConflictException();
    }
  }

  async searchById(id: ProductoEntity['id']): Promise<ProductoEntity> {
    const product = await this.productoRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
