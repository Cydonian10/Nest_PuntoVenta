import { Rol } from '../../../database/entities/rol.entity';

export interface IPayload {
  userId: number;
  name: string;
  roles: Rol[];
}
