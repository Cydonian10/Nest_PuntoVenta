import { ClienteEntity } from '@/entities/cliente.entity';
import { OrdenItemEntity } from '@/entities/order-item.entity';
import { UsuarioEntity } from '@/entities/user.entity';

export interface IOrden {
  id?: number;
  pago: boolean;
  fecha: Date;

  usuarioId: number;
  clienteId: number;
  usuario?: UsuarioEntity;
  cliente?: ClienteEntity;
  ordenItems?: OrdenItemEntity[];
}
