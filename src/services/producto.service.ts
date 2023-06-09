import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Producto } from "../entities/producto.entity";
import { Repository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "../dtos/producto.dto";
import { CategoriaService } from "./categoria.service";

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository( Producto ) private productoRepo:Repository<Producto>,
        private categoriaSrv:CategoriaService
    ) {}

    getAll() {
        return this.productoRepo.find({
            relations:{ categoria: true},
            select:{categoria:{ name:true , id:true }}
        })
    }

    async create( dto:CreateProductDto ) : Promise<Producto> {
        const categoria = await this.categoriaSrv.searchById(dto.categoryId)

        const newProduct = this.productoRepo.create({
            name:dto.name,
            categoria
        })

        return this.productoRepo.save(newProduct)
    }

    async update( dto:UpdateProductDto , id:Producto["id"] ) {
        
    }
}