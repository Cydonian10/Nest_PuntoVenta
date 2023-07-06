import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688491826736 implements MigrationInterface {
  name = 'Init1688491826736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."empleado_rol_enum" AS ENUM('admin', 'seller')`,
    );
    await queryRunner.query(
      `CREATE TABLE "empleado" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "address" character varying NOT NULL, "dni" character varying NOT NULL, "rol" "public"."empleado_rol_enum" NOT NULL DEFAULT 'seller', CONSTRAINT "PK_d15e7688d5ed23e9fdb570b2e5d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "cliente_id" integer, "empleado_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_9ddb814e9bb6927511b5eb19803" UNIQUE ("cliente_id"), CONSTRAINT "UQ_4f431034515f01df194bb94712b" UNIQUE ("empleado_id"), CONSTRAINT "REL_9ddb814e9bb6927511b5eb1980" UNIQUE ("cliente_id"), CONSTRAINT "REL_4f431034515f01df194bb94712" UNIQUE ("empleado_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cliente" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_18990e8df6cf7fe71b9dc0f5f39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "pago" boolean NOT NULL, "fecha" date NOT NULL, "order_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("producto_id" integer NOT NULL, "order_id" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_ecb4798059582d3a0117d1dc5a2" PRIMARY KEY ("producto_id", "order_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "proveedor" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "telefono" character varying NOT NULL, "image" character varying NOT NULL, "sitoweb" character varying NOT NULL, CONSTRAINT "PK_405f60886417ece76cb5681550a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "producto" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "precio" numeric NOT NULL, "cantidad" numeric NOT NULL, "categoria_id" integer NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "proveedor_producto" ("proveedor_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_e2a3345efc5cbe142dc606d1a9b" PRIMARY KEY ("proveedor_id", "producto_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e40b51cc2820fb8ae2ffb732d" ON "proveedor_producto" ("proveedor_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4afb11afe089d8f1f553973422" ON "proveedor_producto" ("producto_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4f431034515f01df194bb94712b" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86" FOREIGN KEY ("order_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_357fe6ec2b0346980cd1d3efa7c" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" ADD CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "proveedor_producto" ADD CONSTRAINT "FK_9e40b51cc2820fb8ae2ffb732d2" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "proveedor_producto" ADD CONSTRAINT "FK_4afb11afe089d8f1f553973422c" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "proveedor_producto" DROP CONSTRAINT "FK_4afb11afe089d8f1f553973422c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "proveedor_producto" DROP CONSTRAINT "FK_9e40b51cc2820fb8ae2ffb732d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" DROP CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item" DROP CONSTRAINT "FK_357fe6ec2b0346980cd1d3efa7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4f431034515f01df194bb94712b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4afb11afe089d8f1f553973422"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9e40b51cc2820fb8ae2ffb732d"`,
    );
    await queryRunner.query(`DROP TABLE "proveedor_producto"`);
    await queryRunner.query(`DROP TABLE "categoria"`);
    await queryRunner.query(`DROP TABLE "producto"`);
    await queryRunner.query(`DROP TABLE "proveedor"`);
    await queryRunner.query(`DROP TABLE "order_item"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "cliente"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "empleado"`);
    await queryRunner.query(`DROP TYPE "public"."empleado_rol_enum"`);
  }
}
