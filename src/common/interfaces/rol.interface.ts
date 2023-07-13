import { UsuarioEntity } from '@/entities/user.entity';

export interface IRol {
  id?: number;
  nombre: string;
  descripcion: string;
  usuarios?: UsuarioEntity[];
}
