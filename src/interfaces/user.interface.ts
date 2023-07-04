export interface IUser {
  email: string;
  password: string;
  empleadoId?: number;
  clienteId?: number;
}

export interface IProducto {
  nombre: string;
  precio: number;
  cantidad: number;
  categoriaId: number;
}
