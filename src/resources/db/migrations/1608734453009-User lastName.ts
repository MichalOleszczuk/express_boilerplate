/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastName1608734453009 implements MigrationInterface {
  name = 'UserLastName1608734453009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "temporary_user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "lastName" varchar NOT NULL)',
    );
    await queryRunner.query(
      'INSERT INTO "temporary_user_entity"("id", "name") SELECT "id", "name" FROM "user_entity"',
    );
    await queryRunner.query('DROP TABLE "user_entity"');
    await queryRunner.query(
      'ALTER TABLE "temporary_user_entity" RENAME TO "user_entity"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_entity" RENAME TO "temporary_user_entity"',
    );
    await queryRunner.query(
      'CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)',
    );
    await queryRunner.query(
      'INSERT INTO "user_entity"("id", "name") SELECT "id", "name" FROM "temporary_user_entity"',
    );
    await queryRunner.query('DROP TABLE "temporary_user_entity"');
  }
}
