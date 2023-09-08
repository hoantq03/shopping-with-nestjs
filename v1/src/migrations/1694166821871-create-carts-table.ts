import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartsTable1694166821871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE "carts" (
                "id" character varying NOT NULL,
                "amount_total" decimal NOT NULL DEFAULT 0,
                
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL DEFAULT '1',
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL DEFAULT '1',
                
                CONSTRAINT "PK_a3fc6bfb9fb1c0c84167433f907" PRIMARY KEY ("id")
                );
                `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
