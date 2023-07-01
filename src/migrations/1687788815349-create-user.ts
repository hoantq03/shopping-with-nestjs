import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1687788815349 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "users" (
          "id" character varying NOT NULL,
          "first_name" character varying(100) NOT NULL,
          "last_name" character varying(100) NOT NULL,
          "email" character varying(100) NOT NULL,
          "password" character varying NOT NULL,
          "phone" character varying(20) NOT NULL,
          "birthday" TIMESTAMP NOT NULL,
          "status" smallint DEFAULT 1,
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "created_by" character varying NOT NULL DEFAULT '1',
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updated_by" character varying NOT NULL DEFAULT '1',
          CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
          CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
          );
      `,
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
