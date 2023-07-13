import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { BaseEntity } from '@/common/models';
import { IOrden } from '@/common/interfaces';

import { UsuarioEntity } from './usuario.entity';
import { ClienteEntity } from './cliente.entity';
import { OrdenItemEntity } from './order-item.entity';

@Entity('ordenes')
export class OrderEntity extends BaseEntity implements IOrden {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'boolean' })
  pago: boolean;

  @Column({ type: 'date' })
  fecha: Date;

  @Exclude()
  @Column({ name: 'usuario_id' })
  usuarioId: number;

  @Exclude()
  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @Exclude()
  @Column({ name: 'cliente_id' })
  clienteId: number;

  @Exclude()
  @ManyToOne(() => ClienteEntity)
  @JoinColumn({ name: 'cliente_id' })
  cliente: ClienteEntity;

  @Exclude()
  @OneToMany(() => OrdenItemEntity, (oI) => oI.orden)
  orderItems: OrdenItemEntity[];

  @Expose()
  get datosCliente() {
    return {
      nombre: this.cliente.nombre,
      dirección: this.cliente.direccion,
    };
  }

  @Expose()
  get nombreVendedor() {
    return this.usuario.nombre;
  }

  @Expose()
  get items() {
    return this.orderItems.map((item) => {
      const { precio, nombre } = item.item;
      return {
        quantity: item.cantidad,
        precio,
        nombre,
      };
    });
  }
}
