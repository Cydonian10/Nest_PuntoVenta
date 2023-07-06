import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitNot1688672813436 implements MigrationInterface {
  name = 'InitNot1688672813436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86"`,
    );
    await queryRunner.query(
      `CREATE TABLE "rol" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "descripcion" text NOT NULL, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_x_rol" ("user_id" integer NOT NULL, "rol_id" integer NOT NULL, CONSTRAINT "PK_a15de44a85fc01977964fc9a981" PRIMARY KEY ("user_id", "rol_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d9e74e016f87610ee81a3b644e" ON "user_x_rol" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_64e043b6f474858955886211cf" ON "user_x_rol" ("rol_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "nombre" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "direccion" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "dni" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86" FOREIGN KEY ("order_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_x_rol" ADD CONSTRAINT "FK_d9e74e016f87610ee81a3b644ec" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_x_rol" ADD CONSTRAINT "FK_64e043b6f474858955886211cf2" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_x_rol" DROP CONSTRAINT "FK_64e043b6f474858955886211cf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_x_rol" DROP CONSTRAINT "FK_d9e74e016f87610ee81a3b644ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dni"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "direccion"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nombre"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_64e043b6f474858955886211cf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d9e74e016f87610ee81a3b644e"`,
    );
    await queryRunner.query(`DROP TABLE "user_x_rol"`);
    await queryRunner.query(`DROP TABLE "rol"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_58998c5eaeaacdd004dec8b5d86" FOREIGN KEY ("order_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
