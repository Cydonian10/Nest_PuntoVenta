import { OrderEntity } from '@/entities/order.entity';
import { ProductoEntity } from '@/entities/producto.entity';

export interface IOrdenItem {
  productId: number;
  ordenId: number;
  cantidad: number;
  item?: ProductoEntity;
  orden?: OrderEntity;
}
