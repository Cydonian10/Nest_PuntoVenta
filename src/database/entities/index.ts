import { Categoria } from './categoria.entity';

import { OrderItem } from './order-item';
import { Order } from './order.entity';
import { Producto } from './producto.entity';
import { Proveedor } from './proveedor';
import { Rol } from './rol.entity';
import { User } from './user.entity';

export const Entities = [
  User,
  Rol,
  Producto,
  Categoria,
  Order,
  OrderItem,
  Proveedor,
];
