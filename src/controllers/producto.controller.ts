import { Controller, Get } from "@nestjs/common";
import { ProductoService } from "../services/producto.service";

@Controller("producto")
export class ProductController {
    constructor(private productSrv:ProductoService) {}

    @Get()
    getAll() {
        return this.productSrv.getAll()
    }
}