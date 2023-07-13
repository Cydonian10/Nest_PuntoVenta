import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@/common/models';
import { IRol } from '@/common/interfaces';
import { UsuarioEntity } from './user.entity';

@Entity({ name: 'roles' })
export class Rol extends BaseEntity implements IRol {
  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToMany(() => UsuarioEntity)
  usuarios: UsuarioEntity[];
}
