import { faker } from '@faker-js/faker/locale/es';
import { CreateProductDto } from 'src/dtos/producto.dto';

export function generateOneProduct(): CreateProductDto {
  return {
    nombre: faker.commerce.product(),
    precio: Math.floor(Math.random() * (100 - 20) + 20),
    categoriaId: Math.floor(Math.random() * (5 - 1) + 1),
    stock: Math.floor(Math.random() * (40 - 20) + 20),
  };
}

export function generateManyProductos(size = 10) {
  const products = [];

  for (let index = 0; index <= size - 1; index++) {
    products.push(generateOneProduct());
  }

  return products;
}

// export function getManyProducts() : {name:string,categoria:{id:number}}[] {

//     return [
//         {  name:"product 1" , categoria :{ id: 1 } },
//         {  name:"product 2" , categoria :{ id: 2 } },
//         {  name:"product 3" , categoria :{ id: 3 } },
//         {  name:"product 5" , categoria :{ id: 4 } },
//         {  name:"product 6" , categoria :{ id: 5 } }
//     ]

// }
