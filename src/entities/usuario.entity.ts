import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';

import { BaseEntity } from '@/common/models';
import { IUser } from '@/common/interfaces';

import { OrdenEntity } from './orden.entity';
import { Rol } from './rol.entity';

@Entity({ name: 'usuarios' })
export class UsuarioEntity extends BaseEntity implements IUser {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  direccion: string;

  @Column({ type: 'varchar', unique: true })
  dni: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ManyToMany(() => Rol)
  @JoinTable({
    name: 'usuario_x_rol',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'rol_id' },
  })
  roles: Rol[];

  @OneToMany(() => OrdenEntity, (o) => o.usuario)
  ordenes: OrdenEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
