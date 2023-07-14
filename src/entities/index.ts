import { CategoriaEntity } from './categoria.entity';
import { ClienteEntity } from './cliente.entity';

import { OrdenItemEntity } from './orden-item.entity';
import { OrdenEntity } from './orden.entity';
import { ProductoEntity } from './producto.entity';
import { ProveedorEntity } from './proveedor.entity';
import { Rol } from './rol.entity';
import { UsuarioEntity } from './usuario.entity';

export const Entities = [
  UsuarioEntity,
  ClienteEntity,
  Rol,
  ProductoEntity,
  CategoriaEntity,
  OrdenEntity,
  OrdenItemEntity,
  ProveedorEntity,
];
