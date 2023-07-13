import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { IOrdenItem } from '@/common/interfaces';

import { ProductoEntity } from './producto.entity';
import { OrderEntity } from './order.entity';

@Entity('orden_items')
export class OrdenItemEntity implements IOrdenItem {
  @PrimaryColumn({ name: 'producto_id' })
  productId: number;

  @PrimaryColumn({ name: 'orden_id' })
  ordenId: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => ProductoEntity)
  @JoinColumn({ name: 'producto_id' })
  item: ProductoEntity;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'orden_id' })
  orden: OrderEntity;
}
