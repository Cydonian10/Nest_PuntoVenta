import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EntityBase } from './base-entity';
import { Cliente } from './cliente.entity';
import { Empleado } from './empleado.entity';
import { IUser } from '../../interfaces/user.interface';

@Entity()
export class User extends EntityBase implements IUser {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ name: 'cliente_id' })
  clienteId?: number;

  @Column({ name: 'empleado_id' })
  empleadoId?: number;

  @OneToOne(() => Cliente, (c) => c.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

  @OneToOne(() => Empleado, (e) => e.user, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empleado_id' })
  empleado?: Empleado;
}
