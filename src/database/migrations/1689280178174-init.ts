import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1689280178174 implements MigrationInterface {
    name = 'Init1689280178174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "descripcion" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "nombre" character varying NOT NULL, "direccion" character varying NOT NULL, "dni" character varying NOT NULL, "avatar" character varying, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "UQ_3fd196cb306bed4b2a2e7c34154" UNIQUE ("dni"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "direccion" character varying, "avatar" character varying, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ordenes" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "total" numeric(10,2) NOT NULL, "pago" boolean NOT NULL, "fecha" date NOT NULL, "usuario_id" integer NOT NULL, "cliente_id" integer NOT NULL, CONSTRAINT "PK_58713affeb8e3b7b30b9eeeee7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orden_items" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "producto_id" integer NOT NULL, "orden_id" integer NOT NULL, "cantidad" integer NOT NULL, CONSTRAINT "PK_2e5335f80323aa222772a27d13d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proveedores" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "telefono" character varying NOT NULL, "image" character varying NOT NULL, "sitioweb" character varying NOT NULL, CONSTRAINT "PK_1dcf121f19f362fb1b4c0a493a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."productos_unidademedida_enum" AS ENUM('unidades', 'kilogramo')`);
        await queryRunner.query(`CREATE TABLE "productos" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "precio" numeric NOT NULL, "stock" numeric NOT NULL, "unidadeMedida" "public"."productos_unidademedida_enum" NOT NULL DEFAULT 'kilogramo', "categoria_id" integer NOT NULL, CONSTRAINT "PK_04f604609a0949a7f3b43400766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categorias" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_x_rol" ("usuario_id" integer NOT NULL, "rol_id" integer NOT NULL, CONSTRAINT "PK_ed11745c396894b806f0a6f63da" PRIMARY KEY ("usuario_id", "rol_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_adb3d12bbd1e357d9f6b585e23" ON "usuario_x_rol" ("usuario_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8c3914ae366db242f91c50c9f4" ON "usuario_x_rol" ("rol_id") `);
        await queryRunner.query(`CREATE TABLE "proveedor_producto" ("proveedor_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_e2a3345efc5cbe142dc606d1a9b" PRIMARY KEY ("proveedor_id", "producto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e40b51cc2820fb8ae2ffb732d" ON "proveedor_producto" ("proveedor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4afb11afe089d8f1f553973422" ON "proveedor_producto" ("producto_id") `);
        await queryRunner.query(`ALTER TABLE "ordenes" ADD CONSTRAINT "FK_67521a8cf6c578dbc01707f0299" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ordenes" ADD CONSTRAINT "FK_104bc2340caaf1b919dcdb20ebd" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_items" ADD CONSTRAINT "FK_a377fb94ae0cc24276ef33b57f5" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_items" ADD CONSTRAINT "FK_0338075bbe6b4213477f145d661" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos" ADD CONSTRAINT "FK_5aaee6054b643e7c778477193a3" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_x_rol" ADD CONSTRAINT "FK_adb3d12bbd1e357d9f6b585e23b" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "usuario_x_rol" ADD CONSTRAINT "FK_8c3914ae366db242f91c50c9f42" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "proveedor_producto" ADD CONSTRAINT "FK_9e40b51cc2820fb8ae2ffb732d2" FOREIGN KEY ("proveedor_id") REFERENCES "proveedores"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "proveedor_producto" ADD CONSTRAINT "FK_4afb11afe089d8f1f553973422c" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proveedor_producto" DROP CONSTRAINT "FK_4afb11afe089d8f1f553973422c"`);
        await queryRunner.query(`ALTER TABLE "proveedor_producto" DROP CONSTRAINT "FK_9e40b51cc2820fb8ae2ffb732d2"`);
        await queryRunner.query(`ALTER TABLE "usuario_x_rol" DROP CONSTRAINT "FK_8c3914ae366db242f91c50c9f42"`);
        await queryRunner.query(`ALTER TABLE "usuario_x_rol" DROP CONSTRAINT "FK_adb3d12bbd1e357d9f6b585e23b"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP CONSTRAINT "FK_5aaee6054b643e7c778477193a3"`);
        await queryRunner.query(`ALTER TABLE "orden_items" DROP CONSTRAINT "FK_0338075bbe6b4213477f145d661"`);
        await queryRunner.query(`ALTER TABLE "orden_items" DROP CONSTRAINT "FK_a377fb94ae0cc24276ef33b57f5"`);
        await queryRunner.query(`ALTER TABLE "ordenes" DROP CONSTRAINT "FK_104bc2340caaf1b919dcdb20ebd"`);
        await queryRunner.query(`ALTER TABLE "ordenes" DROP CONSTRAINT "FK_67521a8cf6c578dbc01707f0299"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4afb11afe089d8f1f553973422"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e40b51cc2820fb8ae2ffb732d"`);
        await queryRunner.query(`DROP TABLE "proveedor_producto"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8c3914ae366db242f91c50c9f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adb3d12bbd1e357d9f6b585e23"`);
        await queryRunner.query(`DROP TABLE "usuario_x_rol"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
        await queryRunner.query(`DROP TABLE "productos"`);
        await queryRunner.query(`DROP TYPE "public"."productos_unidademedida_enum"`);
        await queryRunner.query(`DROP TABLE "proveedores"`);
        await queryRunner.query(`DROP TABLE "orden_items"`);
        await queryRunner.query(`DROP TABLE "ordenes"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
