import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInventoriesTable1694181294315 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE "inventories" (
                "id" character varying NOT NULL,
    
                "product_id" character varying,
                "user_id" character varying NOT NULL,
                "stock" integer NOT NULL,
                "location" character varying NOT NULL,
                
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL DEFAULT '1',
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL DEFAULT '1',
                
                CONSTRAINT "PK_b9fb1c6a3fb0c84167433f907fc" PRIMARY KEY ("id"),
                CONSTRAINT "FK_f9fb85f04cf306b4161cc37a7b9" FOREIGN KEY ("product_id") REFERENCES products("id"),
                CONSTRAINT "FK_f9f4cb85f0c37a7b9f306b4161c" FOREIGN KEY ("user_id") REFERENCES users("id")
                );
                `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
