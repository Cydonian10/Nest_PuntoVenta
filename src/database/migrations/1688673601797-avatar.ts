import { MigrationInterface, QueryRunner } from "typeorm";

export class Avatar1688673601797 implements MigrationInterface {
    name = 'Avatar1688673601797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
