import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ProductoEntity } from './producto.entity';
import { BaseEntity } from '@/common/models';
import { IProveedor } from '@/common/interfaces';

@Entity({ name: 'proveedores' })
export class ProveedorEntity extends BaseEntity implements IProveedor {
  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column()
  image: string;

  @Column()
  sitioweb: string;

  @ManyToMany(() => ProductoEntity)
  @JoinTable({
    name: 'proveedor_producto',
    inverseJoinColumn: {
      name: 'producto_id',
    },
    joinColumn: { name: 'proveedor_id' },
  })
  productos: ProductoEntity[];
}
