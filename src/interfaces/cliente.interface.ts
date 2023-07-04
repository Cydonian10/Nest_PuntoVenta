import { User } from '../database/entities/user.entity';
import { Order } from '../database/entities/order.entity';

export interface ICliente {
  name: string;
  address: string;
  user: User;
  orders: Order[];
}
