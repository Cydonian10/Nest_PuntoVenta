import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository, UpdateResult } from 'typeorm';

import { CreateVentaDto } from '@/dtos/orden.dto';
import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { OrdenEntity } from '@/entities/orden.entity';
import { ClienteEntity } from '@/entities/cliente.entity';
import { ProductoEntity } from '@/entities/producto.entity';

@Injectable()
export class VentaService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(OrdenEntity) private ordenRepository: Repository<OrdenEntity>,
  ) {}

  async crearVenta(dto: CreateVentaDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //obtemos los items de la orden
    const itemsOrden = dto.items;
    try {
      /**
       * Cremos la venta del producto
       */
      const newOrden = queryRunner.manager.create(OrdenEntity, {
        ...dto.orden,
        usuarioId: userId,
      });

      const resp = await queryRunner.manager.save(OrdenEntity, newOrden);

      const items: OrdenItemEntity[] = [];

      for (let i = 0; i < dto.items.length; i++) {
        const item1 = queryRunner.manager.create(OrdenItemEntity, {
          productId: dto.items[i].productId,
          cantidad: dto.items[i].cantidad,
          ordenId: resp.id,
        });
        items.push(item1);
      }

      await queryRunner.manager.insert(OrdenItemEntity, items);

      /**
       * Actulizamos El stock del producto
       */
      const updateProducts: Promise<UpdateResult>[] = [];

      itemsOrden.forEach((item) => {
        updateProducts.push(
          queryRunner.manager.decrement(
            ProductoEntity,
            { id: item.productId },
            'stock',
            item.cantidad,
          ),
        );
      });

      await Promise.all(updateProducts);

      /**
       * Verificamos que el stock no se negativo
       */
      const productos = await queryRunner.manager.findBy(ProductoEntity, {
        id: In([...items.map((item) => item.productId)]),
      });

      productos.forEach((producto) => {
        if (producto.stock < 0) {
          throw new Error('Error no stock de producto');
        }
      });

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { orderId: resp.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async eliminarVenta(id: OrdenEntity['id']) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const venta = await this.ordenRepository.findOne({
      where: { id },
      relations: { cliente: true, usuario: true, ordenItems: { item: true } },
    });
    if (!venta) {
      throw new NotFoundException('Venta no encontrada');
    }

    try {
      const updateProducts: Promise<UpdateResult>[] = [];

      venta.items.forEach((item) => {
        updateProducts.push(
          queryRunner.manager.increment(
            ProductoEntity,
            { id: item.productoId },
            'stock',
            item.cantidad,
          ),
        );
      });

      await Promise.all(updateProducts);

      await this.ordenRepository.delete(venta.id);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { id: venta.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new ConflictException(error.message);
    }
  }

  async encontrarVentas() {
    return this.ordenRepository.find({
      relations: { cliente: true, usuario: true, ordenItems: { item: true } },
    });
  }

  async ventasPorCliente(id: ClienteEntity['id']) {
    const ventas = await this.ordenRepository.find({
      where: { clienteId: id },
      relations: { cliente: true, usuario: true, ordenItems: { item: true } },
    });

    return ventas;
  }

  async encontrarUnaVenta(idVenta: OrdenEntity['id']) {
    const ventas = await this.ordenRepository.findOne({
      where: { id: idVenta },
      relations: { cliente: true, usuario: true, ordenItems: { item: true } },
    });

    return ventas;
  }

  async encontrarVentaPorFecha(fecha: Date) {
    console.log(fecha);
    const ventas = await this.ordenRepository.find({
      where: { fecha },
      relations: { cliente: true, usuario: true, ordenItems: { item: true } },
    });

    return ventas;
  }
}
