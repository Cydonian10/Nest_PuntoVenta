import { MigrationInterface, QueryRunner } from "typeorm";

export class CambiosProductos1688486531072 implements MigrationInterface {
    name = 'CambiosProductos1688486531072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" RENAME COLUMN "name" TO "nombre"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "precio" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "cantidad" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4f431034515f01df194bb94712b"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "cliente_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "empleado_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5"`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "categoria_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4f431034515f01df194bb94712b" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4f431034515f01df194bb94712b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803"`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "categoria_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_1ae19a0cb542cf735d454bab0b5" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "empleado_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "cliente_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4f431034515f01df194bb94712b" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9ddb814e9bb6927511b5eb19803" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "cantidad"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categoria" RENAME COLUMN "nombre" TO "name"`);
    }

}
