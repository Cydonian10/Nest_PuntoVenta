import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository, UpdateResult } from 'typeorm';

import { CreateVentaDto } from '@/dtos/orden.dto';
import { OrdenItemEntity } from '@/entities/order-item.entity';
import { OrderEntity } from '@/entities/order.entity';
import { ClienteEntity } from '@/entities/cliente.entity';
import { ProductoEntity } from '@/entities/producto.entity';

@Injectable()
export class OrdenService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(OrderEntity) private ordenRepository: Repository<OrderEntity>,
    @InjectRepository(OrdenItemEntity)
    private ordenItemRepository: Repository<OrdenItemEntity>,
  ) {}

  async createVenta(dto: CreateVentaDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const items = dto.items;

    try {
      /**
       * Cremos la venta del producto
       */
      const newOrden = queryRunner.manager.create(OrderEntity, {
        ...dto.orden,
        usuarioId: userId,
      });

      const resp = await queryRunner.manager.save(OrderEntity, newOrden);

      const items: OrdenItemEntity[] = [];

      for (let i = 0; i < dto.items.length; i++) {
        const item1 = queryRunner.manager.create(OrdenItemEntity, {
          productId: dto.items[i].productId,
          cantidad: dto.items[i].quantity,
          ordenId: resp.id,
        });
        items.push(item1);
      }

      await queryRunner.manager.insert(OrdenItemEntity, items);

      /**
       * Actulizamos El stock del producto
       */
      const updateProducts: Promise<UpdateResult>[] = [];

      items.forEach((item) => {
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

      return { orderId: resp.id };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async findVentas() {
    return this.ordenRepository.find({
      relations: { cliente: true, usuario: true, orderItems: { item: true } },
    });
  }

  async ventasByCliente(id: ClienteEntity['id']) {
    const ventas = await this.ordenRepository.find({
      where: { clienteId: id },
      relations: { cliente: true, usuario: true, orderItems: { item: true } },
    });

    return ventas;
  }

  async findOneVenta(idVenta: OrderEntity['id']) {
    const ventas = await this.ordenRepository.findOne({
      where: { id: idVenta },
      relations: { cliente: true, usuario: true, orderItems: { item: true } },
    });

    return ventas;
  }

  async findVentasByDate(fecha: Date) {
    const ventas = await this.ordenRepository.find({
      where: { fecha },
    });

    return ventas;
  }
}
