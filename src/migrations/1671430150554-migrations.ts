import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1671430150554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "users" (NAME, PASSWORD, EMAIL, ROLE)
        VALUES ('admin', '$2a$12$NPMz4Z2eV4m0k7t1w3VgZ.iJd1lGsnCFyICnR.eSEBwvnAfDeYi3O', 'admin@admin.com', 'admin');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "users" WHERE "EMAIL" = "admin@admin.com" LIMIT 1;');
  }
}
