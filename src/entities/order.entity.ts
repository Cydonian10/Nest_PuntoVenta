import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityBase } from "./base-entity";
import { Cliente } from "./cliente.entity";
import { OrderItem } from "./order-item";

@Entity()
export class Order extends EntityBase {

    @Column({type:"decimal",precision:10 , scale:2})
    total:number
    
    @Column({type:"boolean"})
    pago:boolean
    
    @Column({type:"date"})
    fecha:Date
    
    @ManyToOne(() => Cliente)
    @JoinColumn({name:"order_id"})
    cliente:Cliente
    
    @OneToMany(() => OrderItem, oI => oI.order)
    orderItems:OrderItem[]
}