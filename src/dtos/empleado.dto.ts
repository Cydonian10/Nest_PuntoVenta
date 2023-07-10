import { EmpleadoRol } from '../shared/interfaces/rol.enum';

export class CreateEmpleadoDto {
  nombre: string;
  address: string;
  dni: string;
  rol: EmpleadoRol;
}
