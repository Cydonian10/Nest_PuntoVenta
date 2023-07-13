import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@/common/models';
import { ICategoria } from '@/common/interfaces';

import { ProductoEntity } from './producto.entity';

@Entity({ name: 'categorias' })
export class CategoriaEntity extends BaseEntity implements ICategoria {
  @Column()
  nombre: string;

  @OneToMany(() => ProductoEntity, (p) => p.categoria, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  productos?: ProductoEntity[];
}
