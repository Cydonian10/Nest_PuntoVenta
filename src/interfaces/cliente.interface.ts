import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

export interface ICliente {
  name: string;
  address: string;
  user: User;
  orders: Order[];
}
