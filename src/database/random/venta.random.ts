import { CreateVentaDto } from '../../dtos/orden.dto';

function generateNumberRandom(max: number, min: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateOneVenta(): CreateVentaDto {
  return {
    items: [
      { productId: generateNumberRandom(8, 5), quantity: generateNumberRandom(4, 2) },
      { productId: generateNumberRandom(5, 1), quantity: generateNumberRandom(4, 2) },
    ],
    orden: {
      pago: true,
      fecha: new Date(),
      clienteId: Math.floor(Math.random() * (5 - 1) + 1),
      total: 200,
    },
  };
}

export function generateManyVentas(size = 10) {
  const ventas: CreateVentaDto[] = [];

  for (let index = 0; index <= size - 1; index++) {
    ventas.push(generateOneVenta());
  }

  return ventas;
}
