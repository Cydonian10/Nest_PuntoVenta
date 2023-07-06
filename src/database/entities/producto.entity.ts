import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityBase } from './base-entity';
import { Categoria } from './categoria.entity';
import { OrderItem } from './order-item';
import { Proveedor } from './proveedor';
import { Exclude } from 'class-transformer';
import { IProducto } from '../../interfaces/user.interface';

@Entity()
export class Producto extends EntityBase implements IProducto {
  @Column()
  nombre: string;

  @Column({ type: 'decimal' })
  precio: number;

  @Column({ type: 'decimal' })
  cantidad: number;

  @Exclude()
  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @ManyToOne(() => Categoria, (c) => c.productos, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria?: Categoria;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItems?: OrderItem[];

  @ManyToMany(() => Proveedor)
  proveedores?: Proveedor[];
}
