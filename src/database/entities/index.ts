import { Categoria } from './categoria.entity';
import { Cliente } from './cliente.entity';

import { OrderItem } from './order-item.entity';
import { Order } from './order.entity';
import { Producto } from './producto.entity';
import { Proveedor } from './proveedor';
import { Rol } from './rol.entity';
import { User } from './user.entity';

export const Entities = [User, Cliente, Rol, Producto, Categoria, Order, OrderItem, Proveedor];
