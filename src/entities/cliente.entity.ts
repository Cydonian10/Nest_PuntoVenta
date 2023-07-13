import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/common/models';
import { ICliente } from '@/common/interfaces';

import { OrderEntity } from './order.entity';

@Entity('clientes')
export class ClienteEntity extends BaseEntity implements ICliente {
  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', nullable: true })
  direccion: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => OrderEntity, (o) => o.cliente)
  ordenes: OrderEntity[];
}
