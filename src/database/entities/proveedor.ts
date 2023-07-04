import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { EntityBase } from './base-entity';
import { Producto } from './producto.entity';

@Entity()
export class Proveedor extends EntityBase {
  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column()
  image: string;

  @Column()
  sitoweb: string;

  @ManyToMany(() => Producto)
  @JoinTable({
    name: 'proveedor_producto',
    inverseJoinColumn: {
      name: 'producto_id',
    },
    joinColumn: { name: 'proveedor_id' },
  })
  productos: Producto[];
}
