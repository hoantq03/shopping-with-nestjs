import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableOrderDetails1689496769580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "order_details" (
          "product_id" character varying NOT NULL,
          "order_id" character varying NOT NULL,
            
          "price" decimal NOT NULL DEFAULT 0,
          "quantity" integer NOT NULL DEFAULT 0,
          
          "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "created_by" character varying NOT NULL DEFAULT '1',
          "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updated_by" character varying NOT NULL DEFAULT '1',
            
          CONSTRAINT "PK_a3ffc8416b1c0b97433f907fc6b" PRIMARY KEY ("product_id","order_id"),
          CONSTRAINT "FK_a3f5cfb170c8416b9fc6fb43907" FOREIGN KEY ("order_id") REFERENCES orders("id"),
          CONSTRAINT "FK_a3fb416b35c6f907fb170c849fc" FOREIGN KEY ("product_id") REFERENCES products("id")
          );
          `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
