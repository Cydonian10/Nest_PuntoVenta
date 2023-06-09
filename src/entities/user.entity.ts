import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityBase } from "./base-entity";
import { Cliente } from "./cliente.entity";
import { Empleado } from "./empleado.entity";

@Entity()
export class User extends EntityBase {

    @Column()
    email:string

    @Column()
    password:string
    @OneToOne(() => Cliente , (c) => c.user ,{ nullable:true ,onDelete:"CASCADE" })
    @JoinColumn({name:"cliente_id"})
    cliente:Cliente

    @OneToOne(() => Empleado, (e) => e.user , { nullable:true,onDelete:"CASCADE" })
    @JoinColumn({name:"empleado_id"})
    empleado:Empleado
}

