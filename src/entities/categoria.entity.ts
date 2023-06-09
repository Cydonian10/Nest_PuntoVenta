import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EntityBase } from "./base-entity";
import { Producto } from "./producto.entity";

@Entity()
export class Categoria extends EntityBase{

    @Column()
    name:string

    @OneToMany(() => Producto, (p) => p.categoria, {onDelete:"SET NULL", nullable:true})
    products?:Producto[]
}