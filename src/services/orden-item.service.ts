import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateOrdenItemDto } from '@/dtos';
import { ProductoEntity } from '@/entities/producto.entity';

@Injectable()
export class OrdenItemnService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(OrdenItemEntity) private ordenItemRepository: Repository<OrdenItemEntity>,
    @InjectRepository(ProductoEntity) private productRepository: Repository<ProductoEntity>,
  ) {}

  async eliminarOrdenItem(id: OrdenItemEntity['id']) {
    const item = await this.ordenItemRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      /**
       * Actulizamos el stock del producto
       */
      await queryRunner.manager.increment(
        ProductoEntity,
        { id: item.productId },
        'stock',
        item.cantidad,
      );
      await this.ordenItemRepository.delete(item.id);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { id: item.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new ConflictException('No se pudo eliminar item');
    }
  }

  async actulizarOrdenItem(dto: UpdateOrdenItemDto, id: OrdenItemEntity['id']) {
    const item = await this.ordenItemRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item no encontrado');
    }

    this.ordenItemRepository.merge(item, dto);

    return this.ordenItemRepository.save(item);
  }
}
