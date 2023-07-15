import { ClienteEntity } from '@/entities/cliente.entity';
import { OrdenItemEntity } from '@/entities/orden-item.entity';
import { UsuarioEntity } from '@/entities/usuario.entity';

export interface IOrden {
  id?: number;
  pago: boolean;
  fecha: Date | string;

  usuarioId?: number;
  clienteId: number;
  usuario?: UsuarioEntity;
  cliente?: ClienteEntity;
  ordenItems?: OrdenItemEntity[];
}
