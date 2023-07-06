import { EmpleadoRol } from '../interfaces/rol.enum';

export class CreateEmpleadoDto {
  nombre: string;
  address: string;
  dni: string;
  rol: EmpleadoRol;
}
