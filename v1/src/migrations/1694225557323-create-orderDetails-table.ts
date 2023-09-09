import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderDetailsTable1694225557323
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE "order_details" (
                "id" character varying NOT NULL,
                
                "quantity" integer NOT NULL DEFAULT 0,
                "total_amount" decimal NOT NULL DEFAULT 0,

                "order_id" character varying NOT NULL,
                "product_id" character varying NOT NULL,
    
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL DEFAULT '1',
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL DEFAULT '1',
                
                CONSTRAINT "PK_c0c84b1907a3f16b9ffc6b7433f" PRIMARY KEY ("id"),
                CONSTRAINT "FK_85fb416f0c37a7069f4cb1cb9f3" FOREIGN KEY ("product_id") REFERENCES products("id"),
                CONSTRAINT "FK_f9f4cf306b4161cb85f0c37a7b9" FOREIGN KEY ("order_id") REFERENCES orders("id")
                );
                `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
