import { UsuarioEntity } from '@/entities/usuario.entity';

export interface IRol {
  id?: number;
  nombre: string;
  descripcion: string;
  usuarios?: UsuarioEntity[];
}
