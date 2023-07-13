import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { IProducto } from '@/common/interfaces';
import { BaseEntity } from '@/common/models';

import { OrdenItemEntity } from './order-item.entity';
import { CategoriaEntity } from './categoria.entity';
import { ProveedorEntity } from './proveedor.entity';

@Entity({ name: 'productos' })
export class ProductoEntity extends BaseEntity implements IProducto {
  @Column()
  nombre: string;

  @Column({ type: 'decimal' })
  precio: number;

  @Column({ type: 'decimal' })
  stock: number;

  @Exclude()
  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @ManyToOne(() => CategoriaEntity, (c) => c.productos, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria?: CategoriaEntity;

  @OneToMany(() => OrdenItemEntity, (orderItem) => orderItem.item)
  orderItems?: OrdenItemEntity[];

  @ManyToMany(() => ProveedorEntity)
  proveedores?: ProveedorEntity[];
}
