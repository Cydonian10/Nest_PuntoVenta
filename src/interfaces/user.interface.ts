import { Empleado } from "../entities/empleado.entity"
import { Cliente } from "../entities/cliente.entity"

export interface IUser {
    id:number
    password:string
    cliente:Cliente
    empleado:Empleado
}