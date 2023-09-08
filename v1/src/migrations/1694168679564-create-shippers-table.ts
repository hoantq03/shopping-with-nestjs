import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShippersTable1694168679564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "shippers" (
            "id" character varying NOT NULL,
            
            "company_name" character varying(100) NOT NULL,
            "phone" integer NOT NULL,
            
            
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a3fb9fb1c0c84167433f907fc6b" PRIMARY KEY ("id")
            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
