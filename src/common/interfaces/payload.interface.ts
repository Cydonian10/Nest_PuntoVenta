import { Rol } from '@/entities/rol.entity';

export interface IPayload {
  userId: number;
  name: string;
  roles: Rol[];
}
