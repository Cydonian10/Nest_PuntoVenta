import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { IOrdenItem } from '@/common/interfaces';
import { BaseEntity } from '@/common/models';

import { ProductoEntity } from './producto.entity';
import { OrdenEntity } from './orden.entity';

@Entity('orden_items')
export class OrdenItemEntity extends BaseEntity implements IOrdenItem {
  @Column({ name: 'producto_id' })
  productId: number;

  @Column({ name: 'orden_id' })
  ordenId: number;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => ProductoEntity)
  @JoinColumn({ name: 'producto_id' })
  item: ProductoEntity;

  @ManyToOne(() => OrdenEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orden_id' })
  orden: OrdenEntity;
}
