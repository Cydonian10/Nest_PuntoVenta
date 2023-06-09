import { faker } from '@faker-js/faker/locale/es';

export function generateOneProduct ()   {
    return {
        name: faker.commerce.product(),
        categoria: { id: Math.floor(Math.random() * (5 - 1) + 1) }
    }
}

export function generateManyProductos (size = 10)  {
    const products = []

    for (let index = 0; index <= size - 1; index++) {
        products.push( generateOneProduct() )        
    }

    return products
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