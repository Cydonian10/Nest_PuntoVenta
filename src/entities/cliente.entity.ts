import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { EntityBase } from "./base-entity";
import { Order } from "./order.entity";

@Entity()
export class Cliente extends EntityBase{
    @Column()
    name:string

    @Column()
    address:string

    @OneToOne(() => User, (u) => u.cliente, {onDelete:"CASCADE"})
    user:User

    @OneToMany(() => Order ,order => order.cliente )
    orders:Order[]
}