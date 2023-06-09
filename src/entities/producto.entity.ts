import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { EntityBase } from "./base-entity";
import { Categoria } from "./categoria.entity";
import { OrderItem } from "./order-item";
import { Proveedor } from "./proveedor";

@Entity()
export class Producto extends EntityBase{

    @Column()
    name:string

    @ManyToOne(() => Categoria, (c) => c.products,{onDelete:"SET NULL",nullable:true})
    @JoinColumn({name:"categoria_id"})
    categoria:Categoria    

    @OneToMany(() => OrderItem , orderItem => orderItem.item)
    orderItems:OrderItem[]

    @ManyToMany(() => Proveedor)
    proveedores:Proveedor[]

    
}