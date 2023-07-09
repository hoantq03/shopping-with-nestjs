import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleColumn1688870468614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD role VARCHAR NOT NULL DEFAULT 'user'`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
