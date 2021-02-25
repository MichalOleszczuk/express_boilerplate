/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1608163413451 implements MigrationInterface {
  name = 'Init1608163413451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user_entity"');
  }
}
